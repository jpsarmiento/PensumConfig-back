import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequisitoEntity } from './requisito.entity';
import { RequisitoService } from './requisito.service';
import { RequisitoController } from './requisito.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RequisitoEntity])],
  providers: [RequisitoService],
  controllers: [RequisitoController]
})
export class RequisitoModule {}