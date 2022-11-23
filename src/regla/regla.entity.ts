/* eslint-disable */
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, Check } from 'typeorm';
import { AreaEntity } from '../area/area.entity';
import { ExamenEntity } from '../examen/examen.entity';
import { TerminoEntity } from '../termino/termino.entity';

@Entity()
@Check('"creditos" >= 0')
@Check('"semestre_inicio" > 200000')
@Check('"semestre_vigencia" < 205002')
@Check('"semestre_vigencia" >= "semestre_inicio"')
export class ReglaEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 semestre_inicio: number;

 @Column()
 semestre_vigencia: number;
 
 @Column()
 creditos: number;

 @ManyToMany(()=> AreaEntity, area => area.reglas)
 areas: AreaEntity[];

 @OneToMany(()=> ExamenEntity, examen => examen.regla)
 examenes: ExamenEntity[];

 @OneToMany(()=> TerminoEntity, termino => termino.regla)
 terminos: TerminoEntity[];
}