/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete, Query, UseGuards } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { RequisitoService } from './requisito.service';
import { RequisitoDto } from './requisito.dto';
import { RequisitoEntity } from './requisito.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('requisitos')
@UseInterceptors(BusinessErrorsInterceptor)
export class RequisitoController {

    constructor(private readonly requisitoService: RequisitoService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.requisitoService.findAll(null);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':requisitoId')
    async findOne(@Param('requisitoId') requisitoId: string) {
        return await this.requisitoService.findOne(requisitoId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('findByFilter/param?')
    async findByFilter(@Query('query') nombre: string): Promise<RequisitoEntity[]> {
    return await this.requisitoService.findAll(nombre);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() requisitoDto: RequisitoDto) {
    const requisito: RequisitoEntity = plainToInstance(RequisitoEntity, requisitoDto);
    return await this.requisitoService.create(requisito);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':requisitoId')
    async update(@Param('requisitoId') requisitoId: string, @Body() requisitoDto: RequisitoDto) {
    const requisito: RequisitoEntity = plainToInstance(RequisitoEntity, requisitoDto);
    return await this.requisitoService.update(requisitoId, requisito);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':requisitoId')
    @HttpCode(204)
    async delete(@Param('requisitoId') requisitoId: string) {
      return await this.requisitoService.delete(requisitoId);
    }
}
