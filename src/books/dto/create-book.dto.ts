import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    price: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    stock?: number;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    soldQuantity?: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    categories?: string[];
    @IsOptional()
    image: string
}
