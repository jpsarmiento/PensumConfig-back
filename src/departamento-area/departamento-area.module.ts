/* eslint-disable */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoEntity } from '../departamento/departamento.entity';
import { DepartamentoAreaService } from './departamento-area.service';
import { AreaEntity } from '../area/area.entity';
import { DepartamentoAreaController } from './departamento-area.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DepartamentoEntity, AreaEntity])],
 providers: [DepartamentoAreaService],
 controllers: [DepartamentoAreaController],
})
export class DepartamentoAreaModule {}
