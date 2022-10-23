/* eslint-disable */
import {IsNotEmpty, IsString} from 'class-validator';
export class RequisitoDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;
}
