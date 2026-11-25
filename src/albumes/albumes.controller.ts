import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AlbumesService } from './albumes.service.js';

@Controller('albumes')
export class AlbumesController {
    constructor(private readonly albumesService: AlbumesService) {}

    @Get()
    findAll() {
        return this.albumesService.findAll();
    }

    // Parámetro de ruta: /api/albumes/2/fotos
    @Get(':id/fotos')
    findFotos(@Param('id', ParseIntPipe) id: number) {
        return this.albumesService.findFotos(id);
    }
}
