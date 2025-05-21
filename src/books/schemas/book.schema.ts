import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";
export type BookDocument = HydratedDocument<Book>;
@Schema({ timestamps: true })
export class Book {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    author: string;
    @Prop()
    image: string
    @Prop()
    description: string;  // mô tả sách, không bắt buộc

    @Prop({ required: true })
    price: number;

    @Prop({ default: 0 })
    stock: number;

    @Prop({ default: 0 })
    soldQuantity: number;

    @Prop({ type: [Types.ObjectId], ref: 'Category', default: [] })
    categories: string[];
    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    }

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;
}
export const BookSchema = SchemaFactory.createForClass(Book);
BookSchema.plugin(softDeletePlugin);