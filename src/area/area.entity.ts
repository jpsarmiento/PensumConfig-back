import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ProgramaEntity } from '../programa/programa.entity';
import { ReglaEntity } from '../regla/regla.entity';

@Entity()
export class AreaEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 creditos: number;
 
 @Column()
 prioridad: string;

 @ManyToMany(()=> ProgramaEntity, programa => programa.areas)
 programas: ProgramaEntity[];

 @ManyToMany(()=> ReglaEntity, regla => regla.areas)
 @JoinTable()
 reglas: ReglaEntity[];
}