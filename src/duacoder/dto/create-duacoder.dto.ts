import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDuacoderDto {
  @ApiProperty({
    description: 'NIF del duacoder',
    example: '12345678A',
  })
  @IsNotEmpty()
  @IsString()
  nif: string;

  @ApiProperty({
    description: 'Nombre del duacoder',
    example: 'Iván Mouzo',
  })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiPropertyOptional({
    description: 'Biografía del duacoder',
    example: 'Desarrollador con experiencia en NestJS.',
  })
  @IsOptional()
  @IsString()
  biografia?: string;

  @ApiPropertyOptional({
    description: 'Departamento al que pertenece',
    example: 'Tecnología',
  })
  @IsOptional()
  @IsString()
  departamento?: string;

  @ApiPropertyOptional({
    description: 'Puesto dentro del departamento',
    example: 'Backend Developer',
  })
  @IsOptional()
  @IsString()
  puesto?: string;

  @ApiPropertyOptional({
    description: 'Lista de skills del duacoder',
    example: ['JavaScript', 'TypeScript', 'Node.js'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiProperty({
    description: 'Indica si le gusta la tortilla con cebolla',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  gustoTortilla: boolean;

  @ApiPropertyOptional({
    description: 'Fecha de nacimiento del duacoder',
    example: '1990-01-01',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  fechaNacimiento?: Date;

  @ApiProperty({
    description: 'Contraseña del duacoder',
    example: 'Password123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
