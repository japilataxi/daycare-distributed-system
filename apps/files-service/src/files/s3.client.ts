import { S3Client } from '@aws-sdk/client-s3';

export function createS3Client() {
  return new S3Client({
    region: process.env.S3_REGION || 'us-east-1',
    endpoint: process.env.S3_ENDPOINT, // MinIO: http://minio:9000
    forcePathStyle: true,              // ✅ necesario para MinIO
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || 'minioadmin',
      secretAccessKey: process.env.S3_SECRET_KEY || 'minioadmin',
    },
  });
}
