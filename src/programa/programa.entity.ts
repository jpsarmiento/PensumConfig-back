import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { AreaEntity } from '../area/area.entity';
import { RequisitoEntity } from '../requisito/requisito.entity';

@Entity()
export class ProgramaEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column()
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