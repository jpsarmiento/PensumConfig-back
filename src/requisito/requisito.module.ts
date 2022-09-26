import { Module } from '@nestjs/common';
import { RequisitoService } from './requisito.service';

@Module({
  providers: [RequisitoService]
})
export class RequisitoModule {}
