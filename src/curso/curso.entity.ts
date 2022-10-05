import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne} from 'typeorm';
import { TerminoEntity } from '../termino/termino.entity';
import { DepartamentoEntity } from '../departamento/departamento.entity';

@Entity()
export class CursoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
 sigla: string;

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

 @ManyToOne(()=> DepartamentoEntity, departamento => departamento.areas)
 depto: DepartamentoEntity;
}