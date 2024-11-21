import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DuacoderService } from './duacoder.service';
import { CreateDuacoderDto } from './dto/create-duacoder.dto';
import { UpdateDuacoderDto } from './dto/update-duacoder.dto';
import { DuacoderFilterDto } from './dto/duacoder-filter.dto';
import { Response } from 'express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
  destination: './uploads/duacoders', // Carpeta donde se guardarán las fotos
  filename: (req, file, cb) => {
    // Generar un nombre de archivo único
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

@ApiTags('Duacoders')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('duacoders')
export class DuacoderController {
  constructor(private readonly duacoderService: DuacoderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto', { storage }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Crear un duacoder' })
  @ApiResponse({
    status: 201,
    description: 'Duacoder creado exitosamente.',
    schema: {
      example: {
        id: 1,
        nif: '12345678A',
        nombre: 'Iván Mouzo',
        biografia: 'Desarrollador con experiencia en NestJS.',
        departamento: 'Tecnología',
        puesto: 'Backend Developer',
        skills: ['JavaScript', 'TypeScript', 'Node.js'],
        foto: 'http://localhost:3000/uploads/duacoders/foto-123456789.jpg',
        gustoTortilla: true,
        fechaNacimiento: '1990-01-01',
        // ... otros campos
      },
    },
  })
  @ApiBody({
    description: 'Datos del duacoder a crear',
    schema: {
      type: 'object',
      properties: {
        nif: { type: 'string', example: '12345678A' },
        nombre: { type: 'string', example: 'Iván Mouzo' },
        // ... otros campos de CreateDuacoderDto ...
        foto: {
          type: 'string',
          format: 'binary',
          description: 'Foto del duacoder',
        },
      },
    },
  })
  @Get('/export/excel')
  @ApiOperation({ summary: 'Exportar duacoders en Excel' })
  @ApiResponse({
    status: 200,
    description: 'Archivo Excel generado exitosamente.',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {},
    },
  })
  async exportToExcel(@Res() res: Response) {
    const buffer = await this.duacoderService.exportToExcel();
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="duacoders.xlsx"',
    });
    res.send(buffer);
  }
  async create(
    @Body() createDuacoderDto: CreateDuacoderDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.duacoderService.create(createDuacoderDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Listar duacoders con filtros y paginación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de duacoders obtenida exitosamente.',
    schema: {
      example: {
        data: [
          {
            id: 1,
            nif: '12345678A',
            nombre: 'Iván Mouzo',
            biografia: 'Desarrollador con experiencia en NestJS.',
            departamento: 'Tecnología',
            puesto: 'Backend Developer',
            skills: ['JavaScript', 'TypeScript', 'Node.js'],
            foto: 'http://localhost:3000/uploads/duacoders/foto-123456789.jpg',
            gustoTortilla: true,
            fechaNacimiento: '1990-01-01',
            // ... otros campos
          },
          // ... otros duacoders
        ],
        total: 1,
        page: 1,
        limit: 10,
      },
    },
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filtrar por nombre',
    example: 'Iván',
  })
  @ApiQuery({
    name: 'department',
    required: false,
    description: 'Filtrar por departamento',
    example: 'Tecnología',
  })
  @ApiQuery({
    name: 'position',
    required: false,
    description: 'Filtrar por puesto',
    example: 'Backend Developer',
  })
  @ApiQuery({
    name: 'skills',
    required: false,
    description: 'Filtrar por skills, separadas por comas',
    example: 'JavaScript,Node.js',
  })
  @ApiQuery({
    name: 'likesOnion',
    required: false,
    description: 'Filtrar por gusto de tortilla con cebolla (true o false)',
    example: true,
  })
  @ApiQuery({
    name: 'birthDateFrom',
    required: false,
    description: 'Filtrar por fecha de nacimiento desde (YYYY-MM-DD)',
    example: '1990-01-01',
  })
  @ApiQuery({
    name: 'birthDateTo',
    required: false,
    description: 'Filtrar por fecha de nacimiento hasta (YYYY-MM-DD)',
    example: '2000-12-31',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Cantidad de registros por página',
    example: 10,
  })
  async findAll(@Query() filterDto: DuacoderFilterDto) {
    return await this.duacoderService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un duacoder' })
  @ApiResponse({
    status: 200,
    description: 'Detalle del duacoder obtenido exitosamente.',
    schema: {
      example: {
        id: 1,
        nif: '12345678A',
        nombre: 'Iván Mouzo',
        biografia: 'Desarrollador con experiencia en NestJS.',
        departamento: 'Tecnología',
        puesto: 'Backend Developer',
        skills: ['JavaScript', 'TypeScript', 'Node.js'],
        foto: 'http://localhost:3000/uploads/duacoders/foto-123456789.jpg',
        gustoTortilla: true,
        fechaNacimiento: '1990-01-01',
        // ... otros campos
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Duacoder no encontrado.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Duacoder con ID 1 no encontrado',
        error: 'Not Found',
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del duacoder',
    example: 1,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.duacoderService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un duacoder' })
  @ApiResponse({
    status: 200,
    description: 'Duacoder actualizado exitosamente.',
    schema: {
      example: {
        id: 1,
        nif: '12345678A',
        nombre: 'Iván Mouzo Actualizado',
        departamento: 'Tecnología',
        puesto: 'Fullstack Developer',
        // ... otros campos
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos.',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'nombre no debe estar vacío',
          // ... otros mensajes
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Duacoder no encontrado.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Duacoder con ID 1 no encontrado',
        error: 'Not Found',
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del duacoder',
    example: 1,
  })
  @ApiBody({
    description: 'Datos para actualizar el duacoder',
    type: UpdateDuacoderDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDuacoderDto: UpdateDuacoderDto,
  ) {
    return await this.duacoderService.update(id, updateDuacoderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un duacoder' })
  @ApiResponse({
    status: 204,
    description: 'Duacoder eliminado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Duacoder no encontrado.',
    schema: {
      example: {
        statusCode: 404,
        message: 'Duacoder con ID 1 no encontrado',
        error: 'Not Found',
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del duacoder',
    example: 1,
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.duacoderService.remove(id);
  }

  @Post(':id/foto')
  @UseInterceptors(FileInterceptor('foto', { storage }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Actualizar la foto de un duacoder' })
  @ApiResponse({
    status: 200,
    description: 'Foto actualizada exitosamente.',
    schema: {
      example: {
        id: 1,
        foto: 'http://localhost:3000/uploads/duacoders/foto-123456789.jpg',
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del duacoder',
    example: 1,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        foto: {
          type: 'string',
          format: 'binary',
          description: 'Nueva foto del duacoder',
        },
      },
    },
  })
  async uploadFoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.duacoderService.updateFoto(id, file);
  }
}
