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

@Controller('employment-history')
export class EmploymentHistoryController {
  constructor(
    private readonly employmentHistoryService: EmploymentHistoryService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createEmploymentHistoryDto: CreateEmploymentHistoryDto,
  ) {
    return this.employmentHistoryService.create(
      createEmploymentHistoryDto,
      req.user.userId,
    );
  }

  @Get()
  findAll() {
    return this.employmentHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employmentHistoryService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
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
  @Post()
  @Delete(':id')
  remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.employmentHistoryService.remove(+id, req.user.userId);
  }
}
