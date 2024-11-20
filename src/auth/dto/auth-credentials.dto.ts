import { IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  nif: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
