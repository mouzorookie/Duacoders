import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DuacoderService } from '../duacoder/duacoder.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private duacoderService: DuacoderService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { nif, password } = authCredentialsDto;
    const duacoder = await this.duacoderService.findOneByNif(nif);

    if (!duacoder) {
      // Si el duacoder no existe, lanzar UnauthorizedException
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, duacoder.password);

    if (!isPasswordValid) {
      // Si la contraseña es incorrecta, lanzar UnauthorizedException
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { nif: duacoder.nif, id: duacoder.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
