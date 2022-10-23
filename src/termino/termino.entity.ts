/* eslint-disable */
import {Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { ReglaEntity } from '../regla/regla.entity';
import { CursoEntity } from '../curso/curso.entity';

@Entity()
export class TerminoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @ManyToMany(()=> CursoEntity, curso => curso.terminos)
 @JoinTable()
 cursos: CursoEntity[];

 @ManyToOne(()=> ReglaEntity, regla => regla.terminos, { onDelete: 'CASCADE' })
 regla: ReglaEntity;
}