/* eslint-disable */
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne} from 'typeorm';

@Entity()
export class DepartamentoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
}