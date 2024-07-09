import mongoose from 'mongoose';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../constants';
import jwt from 'jsonwebtoken';

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    access_token: {
      type: String,
      default: null,
    },
    refresh_token: {
      type: String,
      default: null,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model('arnavsharma_Users', userModel);

export const generateUserToken = async (user: any) => {
  const access_token_payload = { id: user._id.toString(), name: user.name, email: user.email };
  const access_token = jwt.sign(access_token_payload, ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });
  const refresh_token = jwt.sign({ id: user._id.toString() }, REFRESH_TOKEN_SECRET, { expiresIn: '6h' });

  await User.updateOne({ _id: user.id }, { access_token: access_token, refresh_token: refresh_token });
  return { access_token, refresh_token };
};
