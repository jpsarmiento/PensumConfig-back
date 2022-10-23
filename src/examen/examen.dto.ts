/* eslint-disable */
import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class ExamenDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNumber()
    @IsNotEmpty()
    readonly min_nota: number;
}
