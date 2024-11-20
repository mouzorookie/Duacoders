import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsDate,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDuacoderDto {
  @IsNotEmpty()
  @IsString()
  nif: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  biografia?: string;

  @IsOptional()
  @IsString()
  departamento?: string;

  @IsOptional()
  @IsString()
  puesto?: string;

  @IsOptional()
  @IsArray()
  skills?: string[];

  @IsOptional()
  @IsString()
  foto?: string;

  @IsNotEmpty()
  @IsBoolean()
  gustoTortilla: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fechaNacimiento?: Date;

  @IsNotEmpty()
  @IsString()
  password: string;
}
