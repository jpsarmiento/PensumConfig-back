import { Controller } from '@nestjs/common';
import { TerminoService } from './termino.service';

@Controller('termino')
export class TerminoController {

    
    constructor(private readonly terminoService: TerminoService) {}
}
