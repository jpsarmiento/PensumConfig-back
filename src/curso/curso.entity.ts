/* eslint-disable */
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne} from 'typeorm';
import { TerminoEntity } from '../termino/termino.entity';

@Entity()
export class CursoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 sigla: string;

 @Column()
 codigo: string;
 
 @Column()
 creditos: number;

 @Column()
 departamento: string;

 @Column()
 es_epsilon: boolean;

 @Column()
 es_tipo_e: boolean;

 @ManyToMany(()=> TerminoEntity, termino => termino.cursos)
 terminos: TerminoEntity[];
}