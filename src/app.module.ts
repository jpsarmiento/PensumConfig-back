/* eslint-disable */
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
import { ProgramaRequisitoModule } from './programa-requisito/programa-requisito.module';
import { ProgramaAreaModule } from './programa-area/programa-area.module';
import { AreaReglaModule } from './area-regla/area-regla.module';
import { ReglaExamenModule } from './regla-examen/regla-examen.module';
import { ReglaTerminoModule } from './regla-termino/regla-termino.module';
import { TerminoCursoModule } from './termino-curso/termino-curso.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProgramaModule, AreaModule, ReglaModule, ExamenModule, 
    TerminoModule, CursoModule, RequisitoModule, ProgramaRequisitoModule,
    ProgramaAreaModule, AreaReglaModule, ReglaExamenModule, ReglaTerminoModule, 
    TerminoCursoModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'pensumconfig',
    entities: [ProgramaEntity, RequisitoEntity, AreaEntity, ReglaEntity, ExamenEntity, TerminoEntity, CursoEntity],
    dropSchema: false,
    synchronize: true,
    keepConnectionAlive: true
    }), ProgramaRequisitoModule, ProgramaAreaModule, AreaReglaModule, ReglaExamenModule, ReglaTerminoModule, TerminoCursoModule, UserModule, AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}