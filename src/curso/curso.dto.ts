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
    readonly codigo: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly creditos: number;

    @IsBoolean()
    @IsNotEmpty()
    readonly es_epsilon: boolean;

    @IsBoolean()
    @IsNotEmpty()
    readonly es_tipo_e: boolean;
}
