import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDuacoderDto } from './dto/create-duacoder.dto';
import { UpdateDuacoderDto } from './dto/update-duacoder.dto';
import { Duacoder } from './entities/duacoder.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston'; // Importa Logger desde 'winston'
import * as bcrypt from 'bcrypt';
import { DuacoderFilterDto } from './dto/duacoder-filter.dto';

@Injectable()
export class DuacoderService {
  constructor(
    @InjectRepository(Duacoder)
    private duacoderRepository: Repository<Duacoder>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, // Inyecta el logger correctamente
  ) {
    this.logger.info('Logger initialized successfully');
  }

  async create(
    createDuacoderDto: CreateDuacoderDto,
    file?: Express.Multer.File,
  ): Promise<Duacoder> {
    const hashedPassword = await bcrypt.hash(createDuacoderDto.password, 10);
    const duacoder = this.duacoderRepository.create({
      ...createDuacoderDto,
      password: hashedPassword,
    });
    if (file) {
      duacoder.foto = file.filename;
    }
    this.logger.info(
      `Creando un nuevo duacoder con NIF: ${createDuacoderDto.nif}`,
    );
    return await this.duacoderRepository.save(duacoder);
  }

  async updateFoto(id: number, file: Express.Multer.File): Promise<Duacoder> {
    const duacoder = await this.findOne(id);

    if (!file) {
      throw new BadRequestException('No se ha proporcionado ninguna foto');
    }

    // Opcional: Eliminar la foto anterior si existe
    if (duacoder.foto) {
      //const oldPath = `./uploads/duacoders/${duacoder.foto}`;
      // Elimina el archivo si existe
      // Necesitas importar 'fs' y usar 'fs.unlinkSync' o 'fs.unlink' para eliminar el archivo
    }

    duacoder.foto = file.filename;
    this.logger.info(`Actualizando foto del duacoder con ID: ${id}`);
    return await this.duacoderRepository.save(duacoder);
  }

  async findAll(filterDto: DuacoderFilterDto): Promise<any> {
    const {
      name,
      department,
      position,
      skills,
      likesOnion,
      birthDateFrom,
      birthDateTo,
      page = 1,
      limit = 10,
    } = filterDto;

    const query = this.duacoderRepository.createQueryBuilder('duacoder');

    // Aplicar filtros
    if (name) {
      query.andWhere('LOWER(duacoder.nombre) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (department) {
      query.andWhere('duacoder.departamento = :department', { department });
    }

    if (position) {
      query.andWhere('duacoder.puesto = :position', { position });
    }

    if (skills) {
      const skillsArray = skills.split(',');
      query.andWhere('JSON_CONTAINS(duacoder.skills, :skills)', {
        skills: JSON.stringify(skillsArray),
      });
    }

    if (likesOnion !== undefined) {
      query.andWhere('duacoder.gustoTortilla = :likesOnion', { likesOnion });
    }

    if (birthDateFrom && birthDateTo) {
      query.andWhere('duacoder.fechaNacimiento BETWEEN :from AND :to', {
        from: birthDateFrom,
        to: birthDateTo,
      });
    } else if (birthDateFrom) {
      query.andWhere('duacoder.fechaNacimiento >= :from', {
        from: birthDateFrom,
      });
    } else if (birthDateTo) {
      query.andWhere('duacoder.fechaNacimiento <= :to', { to: birthDateTo });
    }

    // Paginación
    const total = await query.getCount();
    const duacoders = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      data: duacoders,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<Duacoder> {
    const duacoder = await this.duacoderRepository.findOneBy({ id });
    if (!duacoder) {
      throw new NotFoundException(`Duacoder con ID ${id} no encontrado`);
    }

    if (duacoder.foto) {
      duacoder.foto = `${process.env.HOST || 'http://localhost:3000'}/uploads/duacoders/${duacoder.foto}`;
    }

    this.logger.info(`Duacoder encontrado con ID: ${id}`);
    return duacoder;
  }

  async update(
    id: number,
    updateDuacoderDto: UpdateDuacoderDto,
  ): Promise<Duacoder> {
    try {
      if (!id) {
        throw new BadRequestException(
          'El parámetro ID es obligatorio para actualizar un duacoder',
        );
      }
      const duacoder = await this.findOne(id);
      Object.assign(duacoder, updateDuacoderDto);
      this.logger.info(`Actualizando duacoder con ID: ${id}`);
      return await this.duacoderRepository.save(duacoder);
    } catch (error) {
      this.logger.error(
        `Error al actualizar duacoder con ID ${id}: ${error.message}`,
        { error },
      );
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      if (!id) {
        throw new BadRequestException(
          'El parámetro ID es obligatorio para eliminar un duacoder',
        );
      }
      const result = await this.duacoderRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Duacoder con ID ${id} no encontrado`);
      }
      this.logger.info(`Duacoder con ID ${id} eliminado`);
    } catch (error) {
      this.logger.error(
        `Error al eliminar duacoder con ID ${id}: ${error.message}`,
        { error },
      );
      throw error;
    }
  }

  async findOneByNif(nif: string): Promise<Duacoder | null> {
    const duacoder = await this.duacoderRepository.findOneBy({ nif });
    return duacoder || null;
  }
}
