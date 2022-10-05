import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoEntity } from './departamento.entity';
import { DepartamentoService } from './departamento.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartamentoEntity])],
  providers: [DepartamentoService]
})
export class DepartamentoModule {}
