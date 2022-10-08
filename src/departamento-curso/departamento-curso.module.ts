import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoEntity } from '../departamento/departamento.entity';
import { DepartamentoCursoService } from './departamento-curso.service';
import { CursoEntity } from '../curso/curso.entity';
import { DepartamentoCursoController } from './departamento-curso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DepartamentoEntity, CursoEntity])],
 providers: [DepartamentoCursoService],
 controllers: [DepartamentoCursoController],
})
export class DepartamentoCursoModule {}
