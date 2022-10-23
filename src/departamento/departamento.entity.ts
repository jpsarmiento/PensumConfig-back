/* eslint-disable */
import { AreaEntity } from '../area/area.entity';
import { CursoEntity } from '../curso/curso.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity()
export class DepartamentoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
   
    @Column()
    nombre: string;

    @OneToMany(()=> CursoEntity, curso => curso.depto)
    cursos: CursoEntity[];

    @OneToMany(()=> AreaEntity, area => area.depto)
    areas: AreaEntity[];
}
