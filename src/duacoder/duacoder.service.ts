import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDuacoderDto } from './dto/create-duacoder.dto';
import { UpdateDuacoderDto } from './dto/update-duacoder.dto';
import { Duacoder } from './entities/duacoder.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DuacoderService {
  constructor(
    @InjectRepository(Duacoder)
    private duacoderRepository: Repository<Duacoder>,
  ) {}

  // Método para encontrar un Duacoder por NIF
  async findOneByNif(nif: string): Promise<Duacoder | null> {
    return this.duacoderRepository.findOne({ where: { nif } });
  }

  async create(createDuacoderDto: CreateDuacoderDto): Promise<Duacoder> {
    console.log('Creating Duacoder with data:', createDuacoderDto);
    const hashedPassword = await bcrypt.hash(createDuacoderDto.password, 10);
    const duacoder = this.duacoderRepository.create({
      ...createDuacoderDto,
      password: hashedPassword,
    });
    return this.duacoderRepository.save(duacoder);
  }

  findAll(): Promise<Duacoder[]> {
    return this.duacoderRepository.find();
  }

  findOne(id: number): Promise<Duacoder> {
    return this.duacoderRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateDuacoderDto: UpdateDuacoderDto,
  ): Promise<Duacoder> {
    console.log('Updating Duacoder with ID:', id);
    console.log('and data:', updateDuacoderDto);
    await this.duacoderRepository.update(id, updateDuacoderDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.duacoderRepository.delete(id);
  }
}
