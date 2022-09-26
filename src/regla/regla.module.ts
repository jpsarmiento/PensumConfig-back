import { Module } from '@nestjs/common';
import { ReglaService } from './regla.service';

@Module({
  providers: [ReglaService]
})
export class ReglaModule {}
