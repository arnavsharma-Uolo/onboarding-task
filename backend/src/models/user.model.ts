import mongoose from 'mongoose';

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model('arnavsharma_Users', userModel);