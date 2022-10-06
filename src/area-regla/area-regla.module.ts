import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaEntity } from '../area/area.entity';
import { AreaReglaService } from './area-regla.service';
import { ReglaEntity } from '../regla/regla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaEntity, ReglaEntity])],
 providers: [AreaReglaService],
})
export class AreaReglaModule {}
