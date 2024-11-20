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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DuacoderService } from './duacoder.service';
import { CreateDuacoderDto } from './dto/create-duacoder.dto';
import { UpdateDuacoderDto } from './dto/update-duacoder.dto';
import { DuacoderFilterDto } from './dto/DuacodeFilterDto';

@UseGuards(AuthGuard('jwt'))
@Controller('duacoders')
export class DuacoderController {
  constructor(private readonly duacoderService: DuacoderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDuacoderDto: CreateDuacoderDto) {
    return await this.duacoderService.create(createDuacoderDto);
  }

  @Get()
  async findAll(@Query() filterDto: DuacoderFilterDto) {
    return await this.duacoderService.findAll(filterDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.duacoderService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDuacoderDto: UpdateDuacoderDto,
  ) {
    return await this.duacoderService.update(id, updateDuacoderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.duacoderService.remove(id);
  }
}
