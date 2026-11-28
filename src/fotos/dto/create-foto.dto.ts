import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, 
    IsString, IsUrl, Max, MaxLength, Min } from 'class-validator';

export class CreateFotoDto {
    @IsString({ message: 'El título debe ser un texto' })
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @MaxLength(100, { message: 'El título no debe superar los 100 caracteres' })
    titulo: string;

    @IsOptional() @IsString({ message: 'La descripción debe ser un texto' })
    descripcion?: string;

    @IsNumber({}, { message: 'La calificación debe ser un número' })
    @Min(0, { message: 'La calificación no debe ser menor que 0' })
    @Max(5, { message: 'La calificación no debe ser mayor que 5' })
    calificacion: number;

    @IsUrl({}, { message: 'La ruta debe ser una URL válida' })
    ruta: string;

    @IsOptional() @IsInt({ message: 'El ID del álbum debe ser un número entero' })
    albumId?: number;

    @IsOptional()
    @IsArray({ message: 'Las etiquetas deben ser un arreglo' })
    @IsString({ each: true, message: 'Cada etiqueta debe ser un texto' })
    etiquetas?: string[]; // ej. ["playa", "noche"]
}