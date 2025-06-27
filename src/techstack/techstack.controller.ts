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
import { TechstackService } from './techstack.service';
import { Techstack } from './entities/techstack.entity';
import { CreateTechstackDto } from './dto/create-techstack.dto';
import { UpdateTechstackDto } from './dto/update-techstack.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entities/user.entity';

@Controller('techstack')
export class TechstackController {
  constructor(private techStackService: TechstackService) {}

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createTechStackDto: CreateTechstackDto,
  ): Promise<Techstack> {
    return this.techStackService.create(createTechStackDto, req.user.userId);
  }

  @Get()
  findAll(): Promise<Techstack[]> {
    return this.techStackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Techstack> {
    return this.techStackService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechstackDto: UpdateTechstackDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<Techstack> {
    return this.techStackService.update(
      id,
      updateTechstackDto,
      req.user.userId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(
    @Param('id') id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<{ message: string }> {
    return this.techStackService.remove(+id, req.user.userId);
  }
}
