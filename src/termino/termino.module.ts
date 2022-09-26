import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminoEntity } from './termino.entity';
import { TerminoService } from './termino.service';

@Module({
  imports: [TypeOrmModule.forFeature([TerminoEntity])],
  providers: [TerminoService]
})
export class TerminoModule {}