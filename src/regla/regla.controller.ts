import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ReglaService } from './regla.service';
import { plainToInstance } from 'class-transformer';
import { ReglaEntity } from './regla.entity';
import { ReglaDto } from './regla.dto';

@Controller('reglas')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReglaController {

    constructor(private readonly reglaService: ReglaService) {}

    
    @Get()
    async findAll() {
        return await this.reglaService.findAll();
    }

    @Get(':reglaId')
    async findOne(@Param('reglaId') reglaId: string) {
        return await this.reglaService.findOne(reglaId);
    }

    @Post()
    async create(@Body() reglaDto: ReglaDto) {
    const regla: ReglaEntity = plainToInstance(ReglaEntity, reglaDto);
    return await this.reglaService.create(regla);
    }

    @Put(':reglaId')
    async update(@Param('reglaId') reglaId: string, @Body() reglaDto: ReglaDto) {
    const regla: ReglaEntity = plainToInstance(ReglaEntity, reglaDto);
    return await this.reglaService.update(reglaId, regla);
    }

    @Delete(':reglaId')
    @HttpCode(204)
    async delete(@Param('reglaId') reglaId: string) {
      return await this.reglaService.delete(reglaId);
    }
}
