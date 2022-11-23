/* eslint-disable */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Check } from 'typeorm';
import { ReglaEntity } from '../regla/regla.entity';

@Entity()
@Check('"min_nota" >= 0')
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