/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Query, Post, Body, Put, HttpCode, Delete, UseGuards } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CursoService } from './curso.service';
import { plainToInstance } from 'class-transformer';
import { CursoEntity } from './curso.entity';
import { CursoDto } from './curso.dto';
import { Roles } from '../user/roles.decorator';
import { Role } from '../user/user';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cursos')
@UseInterceptors(BusinessErrorsInterceptor)
export class CursoController {

    constructor(private readonly cursoService: CursoService) {}

    
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.cursoService.findAll(null);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get(':cursoId')
    async findOne(@Param('cursoId') cursoId: string) {
        return await this.cursoService.findOne(cursoId);
    }

    @Get('findByFilter/param?')
    async findByFilter(@Query('query') sigla: string): Promise<CursoEntity[]> {
    return await this.cursoService.findAll(sigla);
}
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() cursoDto: CursoDto) {
    const curso: CursoEntity = plainToInstance(CursoEntity, cursoDto);
    return await this.cursoService.create(curso);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':cursoId')
    async update(@Param('cursoId') cursoId: string, @Body() cursoDto: CursoDto) {
    const curso: CursoEntity = plainToInstance(CursoEntity, cursoDto);
    return await this.cursoService.update(cursoId, curso);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':cursoId')
    @HttpCode(204)
    async delete(@Param('cursoId') cursoId: string) {
      return await this.cursoService.delete(cursoId);
    }
}
