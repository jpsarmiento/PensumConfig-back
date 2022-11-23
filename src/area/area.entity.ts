/* eslint-disable */
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Check } from 'typeorm';
import { ProgramaEntity } from '../programa/programa.entity';
import { ReglaEntity } from '../regla/regla.entity';

@Entity()
@Check('"creditos" > 0')
@Check(`"tipo" = 'Conocimiento' OR "tipo" = 'Semestre'`)
@Check(`"prioridad" = 'Baja' OR "prioridad" = 'Media' OR "prioridad" = 'Alta' OR "prioridad" = 'Muy alta'`)
export class AreaEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 creditos: number;
 
 @Column()
 prioridad: string;

 @Column()
 tipo: string;

 @ManyToMany(()=> ProgramaEntity, programa => programa.areas)
 programas: ProgramaEntity[];

 @ManyToMany(()=> ReglaEntity, regla => regla.areas)
 @JoinTable()
 reglas: ReglaEntity[];
}