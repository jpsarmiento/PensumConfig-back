import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoEntity } from './curso.entity';
import { CursoService } from './curso.service';

@Module({
  imports: [TypeOrmModule.forFeature([CursoEntity])],
  providers: [CursoService]
})
export class CursoModule {}