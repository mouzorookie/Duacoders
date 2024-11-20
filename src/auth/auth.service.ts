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

  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { nif, password } = authCredentialsDto;
    const duacoder = await this.duacoderService.findOneByNif(nif);

    if (duacoder && (await bcrypt.compare(password, duacoder.password))) {
      const payload = { nif: duacoder.nif, id: duacoder.id };
      return this.jwtService.sign(payload);
    } else {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  }
}
