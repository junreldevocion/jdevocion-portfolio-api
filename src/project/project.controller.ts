import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entities/user.entity';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const user = req.user;
    return this.projectService.create(createProjectDto, user.userId);
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
