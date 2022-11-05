/* eslint-disable */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ReglaEntity } from '../regla/regla.entity';

@Entity()
export class ExamenEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;
 
 @Column({type: 'decimal'})
 min_nota: number;

 @ManyToOne(()=> ReglaEntity, regla => regla.examenes, { onDelete: 'SET NULL' })
 regla: ReglaEntity;
}