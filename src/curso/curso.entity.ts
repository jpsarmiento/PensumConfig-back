import { Column, Entity, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import { TerminoEntity } from '../termino/termino.entity';

@Entity()
export class CursoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 depto: string;

 @Column()
 codigo: number;
 
 @Column()
 creditos: number;

 @Column()
 es_epsilon: boolean;

 @Column()
 es_tipo_e: boolean;

 @ManyToMany(()=> TerminoEntity, termino => termino.cursos)
 terminos: TerminoEntity[];
}