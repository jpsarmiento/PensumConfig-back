import { Module } from '@nestjs/common';
import { TerminoService } from './termino.service';

@Module({
  providers: [TerminoService]
})
export class TerminoModule {}
