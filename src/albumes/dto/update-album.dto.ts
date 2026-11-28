import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto.js';

// Los mismos campos, todos opcionales
export class UpdateAlbumDto
    extends PartialType(CreateAlbumDto) {}