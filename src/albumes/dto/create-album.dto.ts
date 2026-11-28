import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAlbumDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MaxLength(80, { message: 'El nombre no debe superar los 80 caracteres' })
    nombre: string;
}