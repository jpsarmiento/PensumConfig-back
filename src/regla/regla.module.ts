import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReglaEntity } from './regla.entity';
import { ReglaService } from './regla.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReglaEntity])],
  providers: [ReglaService]
})
export class ReglaModule {}