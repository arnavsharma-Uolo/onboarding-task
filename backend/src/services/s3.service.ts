import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AWS_S3_ACCESS_KEY_ID, AWS_S3_BUCKET_NAME, AWS_S3_REGION, AWS_S3_SECRET_KEY } from '../constants';

const s3Client = new S3Client({
  region: AWS_S3_REGION,
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: AWS_S3_SECRET_KEY,
  },
});

export const addFiles = async (file_key: string, file_format: string, file: any) => {
  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: file_key,
    Body: file,
    ContentType: file_format,
  };

  await s3Client.send(new PutObjectCommand(params));
};

export const getFileURL = async (file_key: string) => {
  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: file_key,
  };

  const command = new GetObjectCommand(params);

  const url = await getSignedUrl(s3Client, command);
  return url;
};
