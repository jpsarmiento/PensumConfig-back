/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete, UseGuards  } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { TerminoDto } from './termino.dto';
import { TerminoEntity } from './termino.entity';
import { TerminoService } from './termino.service';

@Controller('terminos')
@UseInterceptors(BusinessErrorsInterceptor)
export class TerminoController {

    constructor(private readonly terminoService: TerminoService) {}
    
    @Get()
    async findAll() {
        return await this.terminoService.findAll();
    }

    @Get(':terminoId')
    async findOne(@Param('terminoId') terminoId: string) {
        return await this.terminoService.findOne(terminoId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() terminoDto: TerminoDto) {
    const termino: TerminoEntity = plainToInstance(TerminoEntity, terminoDto);
    return await this.terminoService.create(termino);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':terminoId')
    async update(@Param('terminoId') terminoId: string, @Body() terminoDto: TerminoDto) {
    const termino: TerminoEntity = plainToInstance(TerminoEntity, terminoDto);
    return await this.terminoService.update(terminoId, termino);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':terminoId')
    @HttpCode(204)
    async delete(@Param('terminoId') terminoId: string) {
      return await this.terminoService.delete(terminoId);
    }
}
