import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class AreaDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly creditos: number;
    
    @IsString()
    @IsNotEmpty()
    readonly prioridad: string;
}
