import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EmploymentHistoryService } from './employment-history.service';
import { CreateEmploymentHistoryDto } from './dto/create-employment-history.dto';
import { UpdateEmploymentHistoryDto } from './dto/update-employment-history.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entities/user.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('employment-history')
export class EmploymentHistoryController {
  constructor(
    private readonly employmentHistoryService: EmploymentHistoryService,
  ) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateEmploymentHistoryDto,
  ) {
    return this.employmentHistoryService.create(dto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.employmentHistoryService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employmentHistoryService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateEmploymentHistoryDto: UpdateEmploymentHistoryDto,
  ) {
    return this.employmentHistoryService.update(
      +id,
      updateEmploymentHistoryDto,
      req.user.userId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.employmentHistoryService.remove(+id, req.user.userId);
  }
}
