import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenEntity } from './examen.entity';
import { ExamenService } from './examen.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenEntity])],
  providers: [ExamenService]
})
export class ExamenModule {}