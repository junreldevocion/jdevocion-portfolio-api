import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller()
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/(jpg|jpeg|png|gif)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file?.buffer || !file?.originalname || !file?.mimetype) {
      throw new BadRequestException('Invalid file upload');
    }

    // TypeScript now knows these are defined
    return this.s3Service.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
  }
}
