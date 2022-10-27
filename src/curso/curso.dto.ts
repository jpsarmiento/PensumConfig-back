/* eslint-disable */
import {IsNotEmpty, IsString, IsNumber, IsBoolean} from 'class-validator';

export class CursoDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly sigla: string;

    @IsNumber()
    @IsNotEmpty()
    readonly codigo: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly creditos: number;

    @IsString()
    @IsNotEmpty()
    readonly departamento: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly es_epsilon: boolean;

    @IsBoolean()
    @IsNotEmpty()
    readonly es_tipo_e: boolean;
}
