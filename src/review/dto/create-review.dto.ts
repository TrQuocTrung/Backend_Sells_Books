import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsOptional()
    comment?: string;
}
