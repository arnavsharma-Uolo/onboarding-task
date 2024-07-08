import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import resizeImage from './sharp.service';
import { addFiles, getFileURL } from './s3.service';
import { CustomError } from '../lib/error/custom.error';
import { User } from '../models/user.model';
import { addDocument, searchDocument, updateDocument } from './elasticsearch/elasticsearch.service';
import { decryptText } from '../lib/decryptText';
import { PASSWORD_ENCRYPTION_KEY } from '../constants';

export const getUsersService = async (q: string = '', page_number: number, limit: number) => {
  const startIndex = (page_number - 1) * limit;

  const query: any = {
    bool: {
      must: q ? [] : { match_all: {} },
      should: q ? [{ match: { name: q } }, { match: { email: q } }] : undefined,
      minimum_should_match: q ? 1 : undefined,
      filter: [{ bool: { must_not: { exists: { field: 'deleted_at' } } } }],
    },
  };

  const { total_count, document_list, error } = await searchDocument('test_user10', query, startIndex, limit);

  if (error) {
    const { db_total_count, db_user_list } = await getUsersServiceMongoDB(q, page_number, limit);
    return { total_count: db_total_count, user_data_list: db_user_list };
  }

  const user_data_list = await Promise.all(
    document_list.map(async (user: any) => {
      const imageURL = user._source.image ? await getProfilePicture(user._source.image) : null;
      return {
        ...user._source,
        image: imageURL,
      };
    }),
  );

  return { total_count, user_data_list };
};

export const getUsersServiceMongoDB = async (q: string = '', page_number: number, limit: number) => {
  const startIndex = (page_number - 1) * limit;
  const filter: any = { deleted_at: null };
  if (q) {
    const regex = new RegExp(q, 'i');
    filter.$or = [{ name: { $regex: regex } }, { email: { $regex: regex } }];
  }

  const total_count = await User.countDocuments(filter);
  const fetched_user_list = await User.find(filter, { _id: 1, name: 1, email: 1, image: 1 }).sort({ updatedAt: -1 }).skip(startIndex).limit(limit);

  const user_data_list = await Promise.all(
    fetched_user_list.map(async (user) => {
      const imageURL = user.image ? await getProfilePicture(user.image) : null;
      return {
        ...user.toObject(),
        image: imageURL,
      };
    }),
  );

  return { db_total_count: total_count, db_user_list: user_data_list };
};

export const getUserService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new CustomError(400, 'Bad Request', 'Invalid ID.');

  await User.findByIdAndUpdate(id, { deleted_at: null });

  const result = await User.findOne({ _id: id, deleted_at: null }, { name: 1, email: 1, _id: 1, image: 1 }).lean();
  if (!result) throw new CustomError(404, 'Not Found', 'User not found.');

  const imageURL = await getProfilePicture(result.image);

  const user_data = {
    id: result._id,
    name: result.name,
    email: result.email,
    image: imageURL,
  };

  return user_data;
};

export const addUserService = async (name: string, email: string, password: string, file: any) => {
  if (!file) throw new CustomError(400, 'Invalid Payload', 'Image is required');

  const userExist = await User.findOne({ email });

  if (userExist && userExist.deleted_at === null) {
    throw new CustomError(400, 'Invalid Payload', 'User with this email already exists');
  }

  const values = {
    name,
    email,
    password: bcrypt.hashSync(await decryptText(password, PASSWORD_ENCRYPTION_KEY), 10),
    image: '',
    deleted_at: null,
  };

  const newUser = userExist ? await User.findOneAndUpdate({ email }, values, { new: true }) : await User.create(values);

  const file_name = `images/profile_${newUser?.id}`;
  const profile_image = await resizeImage(file.buffer, 500, 500);
  await addFiles(file_name, file.mimetype, profile_image);
  await User.findByIdAndUpdate(newUser?.id, { image: file_name });
  await addDocument(
    'test_user10',
    { id: newUser?._id, name: newUser?.name, email: newUser?.email, image: file_name, deleted_at: null },
    newUser?._id.toString(),
  );

  const user = {
    id: newUser?._id,
    name: newUser?.name,
    email: newUser?.email,
  };

  return user;
};

export const updateUserService = async (id: string, name: string, email: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new CustomError(400, 'Bad Request', 'Invalid ID.');

  const result = await User.findOneAndUpdate({ _id: id, deleted_at: null }, { name, email }, { new: true });

  if (!result) {
    throw new CustomError(404, 'Not Found', 'User not found.');
  }

  await updateDocument('test_user10', id, { name, email });
};

export const deleteUserService = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new CustomError(400, 'Bad Request', 'Invalid ID.');

  const result = await User.findOneAndUpdate({ _id: id, deleted_at: null }, { deleted_at: new Date() }, { new: true });

  if (!result) {
    throw new CustomError(404, 'Not Found', 'Document does not exist.');
  }

  await updateDocument('test_user10', id, { deleted_at: new Date() });
};

const getProfilePicture = async (image_key: string | null | undefined = '') => {
  if (!image_key) return '';

  return getFileURL(image_key);
};
