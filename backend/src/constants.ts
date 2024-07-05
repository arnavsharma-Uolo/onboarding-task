import dotenv from 'dotenv';
dotenv.config();

export const NOT_FOUND_MESSAGE = 'The requested resource cannot be found.';
export const GENERIC_ERROR_MESSAGE = 'Something went wrong, please try again later. If the problem persists, contact support.';
export const APPLICATION_ENVIRONMENT = process.env.NODE_ENV || 'development';

export const MONGODB_URI = process.env.MONGODB_URI || '';

export const ELASTICSEARCH_URI = process.env.ELASTICSEARCH_URI || '';

export const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID || '';
export const AWS_S3_SECRET_KEY = process.env.AWS_S3_SECRET_KEY || '';
export const AWS_S3_REGION = process.env.AWS_S3_REGION || 'ap-south-1';
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';
