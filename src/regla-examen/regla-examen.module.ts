import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenEntity } from '../examen/examen.entity';
import { ReglaEntity } from '../regla/regla.entity';
import { ReglaExamenService } from './regla-examen.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReglaEntity, ExamenEntity])],
 providers: [ReglaExamenService],
})
export class ReglaExamenModule {}
