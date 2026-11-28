import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity.js';
import { CreateAlbumDto } from './dto/create-album.dto.js';
import { UpdateAlbumDto } from './dto/update-album.dto.js';

@Injectable()
export class AlbumesService {
    constructor(
        @InjectRepository(Album)
        private readonly albumesRepo: Repository<Album>
    ) {}

    findAll() {
        return this.albumesRepo.find({ order: { id: 'ASC' } });
    }

    async findFotos(id: number) {
        const album = await this.albumesRepo.findOne({ 
            where: { id },
            relations: { fotos: true },
        });
        if (!album) {throw new NotFoundException(`[Álbum ${id} no encontrado`);}
        return album;
    }

    async findOne(id: number): Promise<Album> {
        const album = await this.albumesRepo.findOne({ where: { id } });
        if (!album) {throw new NotFoundException(`Álbum ${id} no encontrado`);}
        return album;
    }

    async create(dto: CreateAlbumDto) {
        const album = this.albumesRepo.create(dto);
        return this.albumesRepo.save(album);
    }

    async update(id: number, dto: UpdateAlbumDto) {
        const album = await this.findOne(id);
        Object.assign(album, dto);
        return this.albumesRepo.save(album);
    }

    async remove(id: number): Promise<void> {
        const album = await this.findOne(id);
        await this.albumesRepo.remove(album);
    }
}

