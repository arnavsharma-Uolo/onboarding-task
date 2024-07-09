import dotenv from 'dotenv';
dotenv.config();

export const NOT_FOUND_MESSAGE = 'The requested resource cannot be found.';
export const GENERIC_ERROR_MESSAGE = 'Something went wrong, please try again later. If the problem persists, contact support.';
export const APPLICATION_ENVIRONMENT = process.env.NODE_ENV || 'development';
export const ORIGIN_URL = process.env.ORIGIN_URL || 'http://localhost:3000';

export const PASSWORD_ENCRYPTION_KEY = process.env.PASSWORD_ENCRYPTION_KEY || '';
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_token_secret_key';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret_key';
export const COOKIE_SETTINGS = { httpOnly: false, secure: true };

export const MONGODB_URI = process.env.MONGODB_URI || '';

export const ELASTICSEARCH_URI = process.env.ELASTICSEARCH_URI || '';
export const ELASTICSEARCH_USER_INDEX = process.env.ELASTICSEARCH_USER_INDEX || 'arnavsharma_users';

export const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID || '';
export const AWS_S3_SECRET_KEY = process.env.AWS_S3_SECRET_KEY || '';
export const AWS_S3_REGION = process.env.AWS_S3_REGION || 'ap-south-1';
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || '';
