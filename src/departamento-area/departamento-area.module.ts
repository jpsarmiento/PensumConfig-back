import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoEntity } from '../departamento/departamento.entity';
import { DepartamentoAreaService } from './departamento-area.service';
import { AreaEntity } from '../area/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartamentoEntity, AreaEntity])],
 providers: [DepartamentoAreaService],
})
export class DepartamentoAreaModule {}
