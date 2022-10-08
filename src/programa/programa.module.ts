import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaEntity } from './programa.entity';
import { ProgramaService } from './programa.service';
import { ProgramaController } from './programa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaEntity])],
  providers: [ProgramaService],
  controllers: [ProgramaController]
})
export class ProgramaModule {}