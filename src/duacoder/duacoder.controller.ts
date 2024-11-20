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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DuacoderService } from './duacoder.service';
import { CreateDuacoderDto } from './dto/create-duacoder.dto';
import { UpdateDuacoderDto } from './dto/update-duacoder.dto';
import { DuacoderFilterDto } from './dto/duacoder-filter.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Duacoders')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('duacoders')
export class DuacoderController {
  constructor(private readonly duacoderService: DuacoderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
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
        foto: 'http://example.com/foto.jpg',
        gustoTortilla: true,
        fechaNacimiento: '1990-01-01',
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
          'nif debe ser una cadena',
          'nombre no debe estar vacío',
          // ... otros mensajes
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiBody({
    description: 'Datos del duacoder a crear',
    type: CreateDuacoderDto,
  })
  async create(@Body() createDuacoderDto: CreateDuacoderDto) {
    return await this.duacoderService.create(createDuacoderDto);
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
            nif: '11111111A',
            nombre: 'Alberto',
            departamento: 'Tecnología',
            puesto: 'Backend Developer',
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
    example: 'Alberto',
  })
  // Añade otros @ApiQuery para los demás filtros si es necesario
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
        departamento: 'Tecnología',
        puesto: 'Backend Developer',
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
}
