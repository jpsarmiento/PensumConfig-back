import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReglaEntity } from '../regla/regla.entity';
import { ReglaExamenService } from './regla-examen.service';
import { ExamenEntity } from '../examen/examen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReglaEntity, ExamenEntity])],
 providers: [ReglaExamenService],
})
export class ReglaExamenModule {}
