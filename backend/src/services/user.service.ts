import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import resizeImage from './sharp.service';
import { addFiles, getFileURL } from './s3.service';
import { CustomError } from '../lib/error/custom.error';
import { generateUserToken, User } from '../models/user.model';
import { addDocument, searchDocument, updateDocument } from './elasticsearch/elasticsearch.service';
import { decryptText } from '../lib/decryptText';
import { ELASTICSEARCH_USER_INDEX, PASSWORD_ENCRYPTION_KEY } from '../constants';

export const getUsersService = async (q: string = '', page_number: number, limit: number) => {
  const startIndex = (page_number - 1) * limit;

  const query: any = {
    bool: {
      must: q ? [] : { match_all: {} },
      should: q ? [{ match: { name: q } }, { match: { email: q } }, { wildcard: { name: `*${q}*` } }, { wildcard: { email: `*${q}*` } }] : undefined,
      minimum_should_match: q ? 1 : undefined,
      filter: [{ bool: { must_not: { exists: { field: 'deleted_at' } } } }],
    },
  };

  const { total_count, document_list, error } = await searchDocument(ELASTICSEARCH_USER_INDEX, query, startIndex, limit);

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
  const fetched_user_list = await User.find(filter, { _id: 1, name: 1, email: 1, image: 1 }).sort({ createdAt: -1 }).skip(startIndex).limit(limit);

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
  if (!mongoose.Types.ObjectId.isValid(id)) throw new CustomError(400, 'Bad Request', 'Invalid User.');

  await User.findByIdAndUpdate(id, { deleted_at: null });

  const result = await User.findOne({ _id: id, deleted_at: null }, { name: 1, email: 1, _id: 1, image: 1, access_token: 1, refresh_token: 1 }).lean();
  if (!result) throw new CustomError(404, 'Not Found', 'User not found.');

  const imageURL = await getProfilePicture(result.image);

  const user_data = {
    id: result._id,
    name: result.name,
    email: result.email,
    image: imageURL,
    access_token: result.access_token,
    refresh_token: result.refresh_token,
  };

  return user_data;
};

export const addUserService = async (name: string, email: string, password: string, file: any) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!file) throw new CustomError(400, 'Invalid Payload', 'Image is required');

    const userExist = await User.findOne({ email }).session(session);

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

    const newUser = userExist ? await User.findOneAndUpdate({ email }, values, { new: true, session }) : await User.create([values], { session });

    const userDocument = Array.isArray(newUser) ? newUser[0] : newUser;

    const file_name = `images/profile_${userDocument?._id}`;
    const profile_image = await resizeImage(file.buffer, 500, 500);
    await User.findByIdAndUpdate(userDocument?._id, { image: file_name }, { session });
    await addDocument(
      ELASTICSEARCH_USER_INDEX,
      { id: userDocument?._id, name: userDocument?.name, email: userDocument?.email, image: file_name, deleted_at: null },
      userDocument?._id.toString(),
    );
    await addFiles(file_name, file.mimetype, profile_image);

    const user = {
      id: userDocument?._id,
      name: userDocument?.name,
      email: userDocument?.email,
    };

    await session.commitTransaction();
    return user;
  } catch (error) {
    await session.abortTransaction();
    if (error instanceof CustomError) throw error;
    throw new CustomError(500, 'Internal Server Error', 'Server Error: Failed to add user.');
  } finally {
    session.endSession();
  }
};

export const updateUserService = async (id: string, name: string, email: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new CustomError(400, 'Bad Request', 'Invalid User.');

    const result = await User.findOneAndUpdate({ _id: id, deleted_at: null }, { name, email }, { new: true, session });

    if (!result) {
      throw new CustomError(404, 'Not Found', 'User not found.');
    }

    await updateDocument(ELASTICSEARCH_USER_INDEX, id, { name, email });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    if (error instanceof CustomError) throw error;
    throw new CustomError(500, 'Internal Server Error', 'Server Error: Failed to update user.');
  } finally {
    session.endSession();
  }
};

export const deleteUserService = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError(400, 'Bad Request', 'Invalid User.');
    }

    const result = await User.findOneAndUpdate({ _id: id, deleted_at: null }, { deleted_at: new Date() }, { new: true, session });

    if (!result) {
      throw new CustomError(404, 'Not Found', 'Document does not exist.');
    }

    await updateDocument(ELASTICSEARCH_USER_INDEX, id, { deleted_at: new Date() });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    if (error instanceof CustomError) throw error;
    throw new CustomError(500, 'Internal Server Error', 'Server Error: Failed to delete user.');
  } finally {
    session.endSession();
  }
};

export const validateUserCredentials = async (email: string, password: string) => {
  const user = await User.findOne({ email, deleted_at: null });
  if (!user) throw new CustomError(404, 'Not Found', 'Invalid Credentials, Check your email and password.');

  if (!bcrypt.compareSync(await decryptText(password, PASSWORD_ENCRYPTION_KEY), user.password)) {
    throw new CustomError(400, 'Bad Request', 'Invalid Credentials, Check your email and password.');
  }
  const { access_token, refresh_token } = await generateUserToken(user);
  const imageURL = await getProfilePicture(user.image);
  const userInfo = { id: user._id.toString(), name: user.name, email: user.email, access_token, refresh_token, image: imageURL };
  return { access_token, refresh_token, userInfo };
};

export const getProfilePicture = async (image_key: string | null | undefined = '') => {
  if (!image_key) return '';

  return getFileURL(image_key);
};
