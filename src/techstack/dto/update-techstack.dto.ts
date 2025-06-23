import { PartialType } from '@nestjs/mapped-types';
import { CreateTechstackDto } from './create-techstack.dto';

export class UpdateTechstackDto extends PartialType(CreateTechstackDto) {}
