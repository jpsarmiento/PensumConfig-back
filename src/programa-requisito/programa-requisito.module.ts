/* eslint-disable */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaEntity } from '../programa/programa.entity';
import { ProgramaRequisitoService } from './programa-requisito.service';
import { RequisitoEntity } from '../requisito/requisito.entity';
import { ProgramaRequisitoController } from './programa-requisito.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaEntity, RequisitoEntity])],
 providers: [ProgramaRequisitoService],
 controllers: [ProgramaRequisitoController],
})
export class ProgramaRequisitoModule {}
