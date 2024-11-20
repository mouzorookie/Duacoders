import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Duacoder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nif: string;

  @Column()
  nombre: string;

  @Column({ type: 'text', nullable: true })
  biografia: string;

  @Column({ nullable: true })
  departamento: string;

  @Column({ nullable: true })
  puesto: string;

  @Column({ type: 'json', nullable: true })
  skills: string[];

  @Column({ nullable: true })
  foto: string;

  @Column()
  gustoTortilla: boolean;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: Date;

  @Column()
  password: string;
}
