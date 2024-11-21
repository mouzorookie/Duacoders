import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ExcelJS from 'exceljs';
import { Repository } from 'typeorm';
import { CreateDuacoderDto } from './dto/create-duacoder.dto';
import { UpdateDuacoderDto } from './dto/update-duacoder.dto';
import { Duacoder } from './entities/duacoder.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston'; // Importa Logger desde 'winston'
import * as bcrypt from 'bcrypt';
import { DuacoderFilterDto } from './dto/duacoder-filter.dto';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class DuacoderService {
  constructor(
    @InjectRepository(Duacoder)
    private readonly duacoderRepository: Repository<Duacoder>,
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
  async exportToPDF(id: number): Promise<Buffer> {
    const duacoder = await this.findOne(id);

    const doc = new PDFDocument();
    const chunks: any[] = [];

    // Capturar los datos generados en un buffer
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {});

    // Configurar el contenido del PDF
    doc.fontSize(20).text(`Duacoder ID: ${duacoder.id}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`NIF: ${duacoder.nif}`);
    doc.text(`Nombre: ${duacoder.nombre}`);
    doc.text(`Biografía: ${duacoder.biografia}`);
    doc.text(`Departamento: ${duacoder.departamento}`);
    doc.text(`Puesto: ${duacoder.puesto}`);
    doc.text(`Skills: ${duacoder.skills.join(', ')}`);
    doc.text(
      `Gusto por la tortilla con cebolla: ${
        duacoder.gustoTortilla ? 'Sí' : 'No'
      }`,
    );
    doc.text(`Fecha de Nacimiento: ${duacoder.fechaNacimiento}`);
    // Añade otros campos si es necesario

    // Finalizar el documento
    doc.end();

    // Esperar a que el documento se complete
    return new Promise<Buffer>((resolve) => {
      const result = Buffer.concat(chunks);
      resolve(result);
    });
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

  async exportToExcel(): Promise<ArrayBuffer> {
    const duacoders = await this.duacoderRepository.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Duacoders');

    // Agregar encabezados
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'NIF', key: 'nif', width: 15 },
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'Biografía', key: 'biografia', width: 50 },
      { header: 'Departamento', key: 'departamento', width: 20 },
      { header: 'Puesto', key: 'puesto', width: 20 },
      { header: 'Skills', key: 'skills', width: 30 },
      { header: 'Gusto Tortilla', key: 'gustoTortilla', width: 15 },
      { header: 'Fecha Nacimiento', key: 'fechaNacimiento', width: 15 },
      // Añade otros campos si es necesario
    ];

    // Agregar filas
    duacoders.forEach((duacoder) => {
      worksheet.addRow({
        id: duacoder.id,
        nif: duacoder.nif,
        nombre: duacoder.nombre,
        biografia: duacoder.biografia,
        departamento: duacoder.departamento,
        puesto: duacoder.puesto,
        skills: duacoder.skills.join(', '),
        gustoTortilla: duacoder.gustoTortilla ? 'Sí' : 'No',
        fechaNacimiento: duacoder.fechaNacimiento,
        // Añade otros campos si es necesario
      });
    });

    // Generar el archivo Excel en un buffer
    const arrayBuffer = await workbook.xlsx.writeBuffer();
    return arrayBuffer;
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
    const [duacoders, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

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
