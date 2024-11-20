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
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DuacoderService } from './duacoder.service';
import { CreateDuacoderDto } from './dto/create-duacoder.dto';
import { UpdateDuacoderDto } from './dto/update-duacoder.dto';

@Controller('duacoders')
@UseGuards(AuthGuard('jwt'))
export class DuacoderController {
  constructor(private readonly duacoderService: DuacoderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDuacoderDto: CreateDuacoderDto) {
    if (!createDuacoderDto.nif) {
      throw new HttpException('NIF es requerido', HttpStatus.BAD_REQUEST);
    }
    return await this.duacoderService.create(createDuacoderDto);
  }

  @Get()
  async findAll() {
    return await this.duacoderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.duacoderService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDuacoderDto: UpdateDuacoderDto,
  ) {
    return this.duacoderService.update(+id, updateDuacoderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.duacoderService.remove(+id);
  }
}
