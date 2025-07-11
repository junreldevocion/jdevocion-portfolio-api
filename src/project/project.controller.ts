import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entities/user.entity';
import { S3Service } from 'src/shared/s3/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RawCreateProjectDto } from './dto/raw-create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private s3Service: S3Service,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
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
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createProjectDto: RawCreateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Project> {
    const user = req.user;

    const imageUrl = await this.s3Service.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
    return this.projectService.create(
      { ...createProjectDto, imageUrl },
      user.userId,
    );
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<Project> {
    return this.projectService.update(id, updateProjectDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ message: string }> {
    return this.projectService.remove(id, req.user.userId);
  }
}
