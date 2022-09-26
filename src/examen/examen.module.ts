import { Module } from '@nestjs/common';
import { ExamenService } from './examen.service';

@Module({
  providers: [ExamenService]
})
export class ExamenModule {}
