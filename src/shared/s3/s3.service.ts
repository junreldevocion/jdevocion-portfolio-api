import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error(
        'AWS credentials or region are not defined in environment variables',
      );
    }

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadFile(
    buffer: Buffer,
    originalName: string,
    mimetype: string,
  ): Promise<string> {
    const bucket = this.configService.get<string>('AWS_BUCKET_NAME');
    const timestamp = Date.now();
    const fileNameWithoutExtension = originalName.split('.').shift();
    const extension = originalName.split('.').pop();
    const key = `${fileNameWithoutExtension}-${timestamp}.${extension}`;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    });
    await this.s3Client.send(command);
    return `https://${bucket}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${key}`;
  }
}
