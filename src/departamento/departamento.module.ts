import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoEntity } from './departamento.entity';
import { DepartamentoService } from './departamento.service';
import { DepartamentoController } from './departamento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DepartamentoEntity])],
  providers: [DepartamentoService],
  controllers: [DepartamentoController]
})
export class DepartamentoModule {}
