import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({
    description: 'NIF del usuario',
    example: '12345678A',
  })
  @IsNotEmpty({ message: 'El NIF es obligatorio' })
  @IsString()
  nif: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Admin1234',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString()
  password: string;
}
