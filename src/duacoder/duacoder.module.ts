import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DuacoderService } from './duacoder.service';
import { DuacoderController } from './duacoder.controller';
import { Duacoder } from './entities/duacoder.entity';
import { LoggerModule } from '../config/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Duacoder]),
    LoggerModule, // Asegúrate de importar LoggerModule
  ],
  controllers: [DuacoderController],
  providers: [DuacoderService],
})
export class DuacoderModule {}
