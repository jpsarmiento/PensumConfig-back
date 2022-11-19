/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete, Query, UseGuards } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ReglaService } from './regla.service';
import { plainToInstance } from 'class-transformer';
import { ReglaEntity } from './regla.entity';
import { ReglaDto } from './regla.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('reglas')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReglaController {

    constructor(private readonly reglaService: ReglaService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.reglaService.findAll(null);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':reglaId')
    async findOne(@Param('reglaId') reglaId: string) {
        return await this.reglaService.findOne(reglaId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('findByFilter/param?')
    async findByFilter(@Query('query') nombre: string): Promise<ReglaEntity[]> {
    return await this.reglaService.findAll(nombre);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() reglaDto: ReglaDto) {
    const regla: ReglaEntity = plainToInstance(ReglaEntity, reglaDto);
    return await this.reglaService.create(regla);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':reglaId')
    async update(@Param('reglaId') reglaId: string, @Body() reglaDto: ReglaDto) {
    const regla: ReglaEntity = plainToInstance(ReglaEntity, reglaDto);
    return await this.reglaService.update(reglaId, regla);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':reglaId')
    @HttpCode(204)
    async delete(@Param('reglaId') reglaId: string) {
      return await this.reglaService.delete(reglaId);
    }
}
