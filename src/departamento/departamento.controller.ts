/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete, UseGuards  } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { DepartamentoEntity } from './departamento.entity';
import { DepartamentoService } from './departamento.service';

@Controller('departamentos')
@UseInterceptors(BusinessErrorsInterceptor)
export class DepartamentoController {

    constructor(private readonly departamentoService: DepartamentoService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.departamentoService.findAll();
    }
}
