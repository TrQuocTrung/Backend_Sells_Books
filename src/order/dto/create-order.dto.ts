import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
    @IsNotEmpty({ message: 'Book ID không được để trống' })
    @IsString()
    book: string;

    @IsNotEmpty({ message: 'Số lượng không được để trống' })
    @IsNumber({}, { message: 'Số lượng phải là số' })
    @Min(1, { message: 'Số lượng phải lớn hơn 0' })
    quantity: number;
}

export class CreateOrderDto {
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}
