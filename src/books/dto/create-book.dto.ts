import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray } from 'class-validator';
import { Types } from 'mongoose';

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

    @IsString({ each: true })
    @IsOptional()
    categories?: Types.ObjectId[];
    @IsOptional()
    image: string
}
export interface IBookQueryResult {
    meta: {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    };
    result: IBook[];
}
export interface IBook {
    _id: string;
    name: string;
    author: string;
    image: string;
    description: string;
    price?: number;
    categories: { _id: string; name: string }[];
}
