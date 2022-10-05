import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ProgramaEntity } from '../programa/programa.entity';

@Entity()
export class RequisitoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;

 @Column()
 descripcion: string;

 @ManyToMany(()=> ProgramaEntity, programa => programa.requisitos)
 programas: ProgramaEntity[];
}