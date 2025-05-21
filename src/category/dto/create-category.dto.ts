import { ArrayUnique, IsArray, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsString({ each: true })
    bookIds?: string[]; // danh sách ID sách thuộc category (nếu bạn muốn thêm sẵn sách vào category khi tạo)
}
