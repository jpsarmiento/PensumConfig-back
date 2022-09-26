import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';

@Module({
  providers: [CursoService]
})
export class CursoModule {}
