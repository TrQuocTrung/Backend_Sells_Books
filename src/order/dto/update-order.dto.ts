import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsArray, IsIn, IsMongoId, IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';


export class UpdateOrderDto extends PartialType(CreateOrderDto) { }
// DTO cho từng item trong đơn hàng khi update items
export class OrderItemDto {
    @IsNotEmpty()
    @IsMongoId()
    book: string; // id của quyển sách

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;

}

// DTO cho cập nhật danh sách items trong đơn hàng
export class UpdateOrderItemsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}

// DTO cho cập nhật trạng thái đơn hàng
export class UpdateOrderStatusDto {
    @IsNotEmpty()
    @IsIn(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'complete'])
    status: string;
}