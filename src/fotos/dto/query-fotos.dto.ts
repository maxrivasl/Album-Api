import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class QueryFotosDto {
    @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @Max(5)
    min: number = 0;

    @IsOptional() @Type(() => Number) @IsNumber() @Min(0) @Max(5)
    max: number = 5;

    @IsOptional() @IsString()
    q?: string;

    @IsOptional() @Type(() => Number) @IsInt() @Min(1)
    page: number = 1;

    @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(50)
    limit: number = 10;
}