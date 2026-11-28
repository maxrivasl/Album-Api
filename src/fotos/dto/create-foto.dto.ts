import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, 
    IsString, IsUrl, Max, MaxLength, Min } from 'class-validator';

export class CreateFotoDto {
    @IsString() @IsNotEmpty() @MaxLength(100)
    titulo: string;

    @IsOptional() @IsString()
    descripcion?: string;

    @IsNumber() @Min(0) @Max(5)
    calificacion: number;

    @IsUrl()
    ruta: string;

    @IsOptional() @IsInt()
    albumId?: number;

    @IsOptional() @IsArray() @IsString({ each: true })
    etiquetas?: string[]; // ej. ["playa", "noche"]
}