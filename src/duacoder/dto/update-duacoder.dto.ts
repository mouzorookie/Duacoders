import { PartialType } from '@nestjs/mapped-types';
import { CreateDuacoderDto } from './create-duacoder.dto';

export class UpdateDuacoderDto extends PartialType(CreateDuacoderDto) {}
