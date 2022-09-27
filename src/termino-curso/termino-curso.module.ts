import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoEntity } from '../curso/curso.entity';
import { TerminoEntity } from '../termino/termino.entity';
import { TerminoCursoService } from './termino-curso.service';

@Module({
  imports: [TypeOrmModule.forFeature([TerminoEntity, CursoEntity])],
 providers: [TerminoCursoService],
})
export class TerminoCursoModule {}
