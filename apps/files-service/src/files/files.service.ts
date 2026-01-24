import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { FileObject } from './file.entity';
import { createS3Client } from './s3.client';
import { randomUUID } from 'crypto';

@Injectable()
export class FilesService {
  private s3 = createS3Client();

  constructor(
    @InjectRepository(FileObject)
    private readonly repo: Repository<FileObject>,
  ) {}

  async upload(file: Express.Multer.File, uploadedBy?: string) {
    const bucket = process.env.S3_BUCKET || 'daycare-files';
    const key = `${randomUUID()}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const baseUrl = process.env.S3_PUBLIC_BASE_URL || process.env.S3_ENDPOINT || '';
    const url = `${baseUrl}/${bucket}/${key}`;

    return this.repo.save({
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      bucket,
      key,
      url,
      uploadedBy,
    });
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }
}
