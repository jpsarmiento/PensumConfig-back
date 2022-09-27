import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequisitoEntity } from '../requisito/requisito.entity';
import { ProgramaEntity } from '../programa/programa.entity';
import { ProgramaRequisitoService } from './programa-requisito.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaEntity, RequisitoEntity])],
 providers: [ProgramaRequisitoService],
})
export class ProgramaRequisitoModule {}
