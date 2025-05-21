import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Book } from 'src/books/schemas/book.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
class OrderItem {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Book.name, required: true })
    book: Types.ObjectId;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    price: number; // Giá tại thời điểm đặt hàng
}
const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({ type: [OrderItemSchema], required: true })
    items: OrderItem[];

    @Prop({ required: true })
    totalAmount: number;

    @Prop({ default: 'pending' })
    status: string; // pending, confirmed, shipped, delivered, cancelled, etc.

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    updatedBy: {
        _id: Types.ObjectId;
        email: string;
    };

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.plugin(softDeletePlugin);
