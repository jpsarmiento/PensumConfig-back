/* eslint-disable */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaEntity } from './area.entity';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AreaEntity])],
  providers: [AreaService],
  controllers: [AreaController]
})
export class AreaModule {}