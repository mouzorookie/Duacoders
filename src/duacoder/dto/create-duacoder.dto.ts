export class CreateDuacoderDto {
  nif: string;
  nombre: string;
  biografia?: string;
  departamento: string;
  puesto: string;
  skills?: string[];
  foto: string;
  gustoTortilla: boolean;
  fechaNacimiento?: Date;
  password: string;
}
