import { Module } from '@nestjs/common';
import { AreaService } from './area.service';

@Module({
  providers: [AreaService]
})
export class AreaModule {}
