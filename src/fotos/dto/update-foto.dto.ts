import { PartialType } from '@nestjs/mapped-types';
import { CreateFotoDto } from './create-foto.dto.js';

// Los mismos campos, todos opcionales
export class UpdateFotoDto
    extends PartialType(CreateFotoDto) {}