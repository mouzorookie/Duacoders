import {
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class DuacoderFilterDto {
  @ApiPropertyOptional({ description: 'Filtrar por nombre', example: 'Iván' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por departamento',
    example: 'Tecnología',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por puesto',
    example: 'Backend Developer',
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por skills, separadas por comas',
    example: 'JavaScript,Node.js',
  })
  @IsOptional()
  @IsString()
  skills?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por gusto de tortilla con cebolla',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  likesOnion?: boolean;

  @ApiPropertyOptional({
    description: 'Filtrar por fecha de nacimiento desde (YYYY-MM-DD)',
    example: '1990-01-01',
  })
  @IsOptional()
  @IsDateString()
  birthDateFrom?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por fecha de nacimiento hasta (YYYY-MM-DD)',
    example: '2000-12-31',
  })
  @IsOptional()
  @IsDateString()
  birthDateTo?: string;

  @ApiPropertyOptional({ description: 'Número de página', example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Cantidad de registros por página',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
