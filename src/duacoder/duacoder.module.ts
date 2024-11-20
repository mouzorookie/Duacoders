import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DuacoderService } from './duacoder.service';
import { DuacoderController } from './duacoder.controller';
import { Duacoder } from './entities/duacoder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Duacoder])],
  controllers: [DuacoderController],
  providers: [DuacoderService],
})
export class DuacoderModule {}
