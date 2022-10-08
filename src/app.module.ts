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
import { DepartamentoEntity } from './departamento/departamento.entity';
import { CursoEntity } from './curso/curso.entity';
import { DepartamentoModule } from './departamento/departamento.module';
import { ProgramaRequisitoService } from './programa-requisito/programa-requisito.service';
import { ProgramaAreaService } from './programa-area/programa-area.service';
import { AreaReglaService } from './area-regla/area-regla.service';
import { ReglaExamenService } from './regla-examen/regla-examen.service';
import { ReglaTerminoService } from './regla-termino/regla-termino.service';
import { TerminoCursoService } from './termino-curso/termino-curso.service';
import { DepartamentoCursoService } from './departamento-curso/departamento-curso.service';
import { DepartamentoAreaService } from './departamento-area/departamento-area.service';
import { DepartamentoAreaModule } from './departamento-area/departamento-area.module';
import { DepartamentoCursoModule } from './departamento-curso/departamento-curso.module';
import { ProgramaRequisitoModule } from './programa-requisito/programa-requisito.module';
import { ProgramaAreaModule } from './programa-area/programa-area.module';
import { AreaReglaModule } from './area-regla/area-regla.module';
import { ReglaExamenModule } from './regla-examen/regla-examen.module';
import { ReglaTerminoModule } from './regla-termino/regla-termino.module';
import { TerminoCursoModule } from './termino-curso/termino-curso.module';
import { ReglaCursoController } from './regla-curso/regla-curso.controller';

@Module({
  imports: [ProgramaModule, AreaModule, ReglaModule, ExamenModule, TerminoModule, CursoModule, RequisitoModule, DepartamentoModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'pensumconfig',
    entities: [ProgramaEntity, RequisitoEntity, AreaEntity, ReglaEntity, ExamenEntity, TerminoEntity, CursoEntity, DepartamentoEntity],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
    }), DepartamentoAreaModule, DepartamentoCursoModule, ProgramaRequisitoModule, ProgramaAreaModule, AreaReglaModule, ReglaExamenModule, ReglaTerminoModule, TerminoCursoModule, 
  ],
  controllers: [AppController, ReglaCursoController],
  providers: [AppService, ProgramaRequisitoService, ProgramaAreaService, AreaReglaService, ReglaExamenService, ReglaTerminoService, TerminoCursoService, DepartamentoCursoService, DepartamentoAreaService],
})
export class AppModule {}
