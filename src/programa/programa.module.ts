import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaEntity } from './programa.entity';
import { ProgramaService } from './programa.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaEntity])],
  providers: [ProgramaService]
})
export class ProgramaModule {}