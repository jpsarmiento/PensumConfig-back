/* eslint-disable */
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Check } from 'typeorm';
import { AreaEntity } from '../area/area.entity';
import { RequisitoEntity } from '../requisito/requisito.entity';

@Entity()
@Check('"min_gpa" >= 0')
@Check(`"tipo" = 'Pregrado' OR "tipo" = 'Posgrado'`)
export class ProgramaEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column({type: 'decimal'})
 min_gpa: number;
 
 @Column()
 tipo: string;

 @ManyToMany(()=> AreaEntity, area => area.programas)
 @JoinTable()
 areas: AreaEntity[];

 @ManyToMany(()=> RequisitoEntity, requisito => requisito.programas)
 @JoinTable()
 requisitos: RequisitoEntity[];
}