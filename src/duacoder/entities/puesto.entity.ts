import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Puesto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
