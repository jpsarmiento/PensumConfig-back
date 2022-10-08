import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaEntity } from '../programa/programa.entity';
import { ProgramaAreaService } from './programa-area.service';
import { AreaEntity } from '../area/area.entity';
import { ProgramaAreaController } from './programa-area.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaEntity, AreaEntity])],
 providers: [ProgramaAreaService],
 controllers: [ProgramaAreaController],
})
export class ProgramaAreaModule {}
