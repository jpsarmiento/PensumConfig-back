import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaEntity } from './area.entity';
import { AreaService } from './area.service';

@Module({
  imports: [TypeOrmModule.forFeature([AreaEntity])],
  providers: [AreaService]
})
export class AreaModule {}