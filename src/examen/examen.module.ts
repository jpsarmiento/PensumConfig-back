/* eslint-disable */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenEntity } from './examen.entity';
import { ExamenService } from './examen.service';
import { ExamenController } from './examen.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenEntity])],
  providers: [ExamenService],
  controllers: [ExamenController]
})
export class ExamenModule {}