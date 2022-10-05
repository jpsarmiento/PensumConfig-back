import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaEntity } from '../../programa/programa.entity'; 
import { RequisitoEntity } from '../../requisito/requisito.entity';
import { AreaEntity } from '../../area/area.entity';
import { ReglaEntity } from '../../regla/regla.entity';
import { ExamenEntity } from '../../examen/examen.entity';
import { TerminoEntity } from '../../termino/termino.entity';
import { CursoEntity } from '../../curso/curso.entity';
import { DepartamentoEntity } from '../../departamento/departamento.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [ProgramaEntity, RequisitoEntity, AreaEntity, ReglaEntity, ExamenEntity, TerminoEntity, CursoEntity, DepartamentoEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([ProgramaEntity, RequisitoEntity, AreaEntity, ReglaEntity, ExamenEntity, TerminoEntity, CursoEntity, DepartamentoEntity]),
];