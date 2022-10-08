import {IsNotEmpty, IsString} from 'class-validator';

export class DepartamentoDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
}
