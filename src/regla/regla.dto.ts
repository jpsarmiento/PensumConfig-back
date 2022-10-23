/* eslint-disable */
import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class ReglaDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNumber()
    @IsNotEmpty()
    readonly creditos: number;

    @IsNumber()
    @IsNotEmpty()
    readonly semestre_inicio: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly semestre_vigencia: number;
}
