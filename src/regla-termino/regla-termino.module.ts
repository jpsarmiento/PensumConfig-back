/* eslint-disable */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReglaEntity } from '../regla/regla.entity';
import { ReglaTerminoService } from './regla-termino.service';
import { TerminoEntity } from '../termino/termino.entity';
import { ReglaTerminoController } from './regla-termino.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReglaEntity, TerminoEntity])],
 providers: [ReglaTerminoService],
 controllers: [ReglaTerminoController],
})
export class ReglaTerminoModule {}
