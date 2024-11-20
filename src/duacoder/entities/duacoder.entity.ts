import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Duacoder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nif: string;

  @Column()
  nombre: string;

  @Column('text')
  biografia: string;

  @Column()
  departamento: string;

  @Column()
  puesto: string;

  @Column('simple-array')
  skills: string[];

  @Column()
  foto: string;

  @Column()
  gustoTortilla: boolean;

  @Column({ nullable: true })
  fechaNacimiento: Date;

  @Column()
  password: string;
}
