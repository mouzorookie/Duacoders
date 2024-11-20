import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión con NIF y contraseña' })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso. Devuelve el token de acceso.',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta. Faltan parámetros obligatorios.',
    schema: {
      example: {
        statusCode: 400,
        message: 'El NIF y la contraseña son obligatorios',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Credenciales inválidas',
        error: 'Unauthorized',
      },
    },
  })
  @ApiBody({
    description: 'Credenciales de autenticación',
    type: AuthCredentialsDto,
  })
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    if (!authCredentialsDto.nif || !authCredentialsDto.password) {
      throw new BadRequestException('El NIF y la contraseña son obligatorios');
    }
    return await this.authService.validateUser(authCredentialsDto);
  }
}
