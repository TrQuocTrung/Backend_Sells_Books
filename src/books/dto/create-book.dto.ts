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
    price: number;

    @IsNumber()
    @IsOptional()
    stock?: number;

    @IsNumber()
    @IsOptional()
    soldQuantity?: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    categories?: string[];
}
