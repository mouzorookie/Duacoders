import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DuacoderModule } from './duacoder/duacoder.module';
import { Duacoder } from './duacoder/entities/duacoder.entity';
import { Departamento } from './duacoder/entities/departamento.entity';
import { Puesto } from './duacoder/entities/puesto.entity';
import * as mysql2 from 'mysql2';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'DuacodersMySQLPassword123',
      database: 'Duacoders',
      entities: [Duacoder, Departamento, Puesto],
      synchronize: true,
      driver: mysql2,
    }),
    AuthModule,
    DuacoderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
