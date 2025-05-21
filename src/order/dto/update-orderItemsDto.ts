import { IsArray, ValidateNested, IsMongoId, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
//User Edit Order
class UpdateOrderItemDto {
    @IsMongoId()
    book: string;

    @IsInt()
    @Min(1)
    quantity: number;
}

export class UpdateOrderItemsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateOrderItemDto)
    items: UpdateOrderItemDto[];
}
