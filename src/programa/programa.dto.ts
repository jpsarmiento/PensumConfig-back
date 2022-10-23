/* eslint-disable */
import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class ProgramaDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly tipo: string;

    @IsNumber()
    @IsNotEmpty()
    readonly min_gpa: number;

}
