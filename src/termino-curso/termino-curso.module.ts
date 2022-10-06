import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminoEntity } from '../termino/termino.entity';
import { TerminoCursoService } from './termino-curso.service';
import { CursoEntity } from '../curso/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TerminoEntity, CursoEntity])],
 providers: [TerminoCursoService],
})
export class TerminoCursoModule {}
