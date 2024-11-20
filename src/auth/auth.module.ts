import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Duacoder } from '../duacoder/entities/duacoder.entity';
import { DuacoderService } from '../duacoder/duacoder.service';
import { LoggerModule } from '../config/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Duacoder]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'SECRET_KEY', // Debe ser seguro y almacenado en variables de entorno
      signOptions: { expiresIn: '24h' },
    }),
    LoggerModule,
  ],
  providers: [AuthService, JwtStrategy, DuacoderService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
