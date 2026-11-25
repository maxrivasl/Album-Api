import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity.js';
import { AlbumesController } from './albumes.controller.js';
import { AlbumesService } from './albumes.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  controllers: [AlbumesController],
  providers: [AlbumesService]
})
export class AlbumesModule {}
