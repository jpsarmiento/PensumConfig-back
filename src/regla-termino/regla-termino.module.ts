import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminoEntity } from '../termino/termino.entity';
import { ReglaEntity } from '../regla/regla.entity';
import { ReglaTerminoService } from './regla-termino.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReglaEntity, TerminoEntity])],
 providers: [ReglaTerminoService],
})
export class ReglaTerminoModule {}
