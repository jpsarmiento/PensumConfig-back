import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaEntity } from '../area/area.entity';
import { ReglaEntity } from '../regla/regla.entity';
import { AreaReglaService } from './area-regla.service';

@Module({
  imports: [TypeOrmModule.forFeature([AreaEntity, ReglaEntity])],
 providers: [AreaReglaService],
})
export class AreaReglaModule {}
