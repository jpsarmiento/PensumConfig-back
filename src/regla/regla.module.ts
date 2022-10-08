import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReglaEntity } from './regla.entity';
import { ReglaService } from './regla.service';
import { ReglaController } from './regla.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReglaEntity])],
  providers: [ReglaService],
  controllers: [ReglaController]
})
export class ReglaModule {}