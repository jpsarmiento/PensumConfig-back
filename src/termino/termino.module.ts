import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminoEntity } from './termino.entity';
import { TerminoService } from './termino.service';
import { TerminoController } from './termino.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TerminoEntity])],
  providers: [TerminoService],
  controllers: [TerminoController]
})
export class TerminoModule {}