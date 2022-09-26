import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequisitoEntity } from './requisito.entity';
import { RequisitoService } from './requisito.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequisitoEntity])],
  providers: [RequisitoService]
})
export class RequisitoModule {}