import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramaModule } from './programa/programa.module';
import { AreaModule } from './area/area.module';
import { ReglaModule } from './regla/regla.module';
import { ExamenModule } from './examen/examen.module';
import { TerminoModule } from './termino/termino.module';
import { CursoModule } from './curso/curso.module';
import { RequisitoModule } from './requisito/requisito.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaEntity } from './programa/programa.entity';
import { RequisitoEntity } from './requisito/requisito.entity';
import { AreaEntity } from './area/area.entity';
import { ReglaEntity } from './regla/regla.entity';
import { ExamenEntity } from './examen/examen.entity';
import { TerminoEntity } from './termino/termino.entity';
import { CursoEntity } from './curso/curso.entity';

@Module({
  imports: [ProgramaModule, AreaModule, ReglaModule, ExamenModule, TerminoModule, CursoModule, RequisitoModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'pensumconfig',
    entities: [ProgramaEntity, RequisitoEntity, AreaEntity, ReglaEntity, ExamenEntity, TerminoEntity, CursoEntity],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
