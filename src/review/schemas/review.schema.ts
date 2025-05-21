import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { User } from 'src/users/schema/user.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true })
    book: Types.ObjectId;

    @Prop({ required: true, min: 1, max: 5 })
    rating: number; // điểm đánh giá 1-5

    @Prop()
    comment: string;

    @Prop({ type: Object })
    createdBy: {
        _id: Types.ObjectId;
        email: string;
    };

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    updatedBy: {
        _id: Types.ObjectId;
        email: string;
    };

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    deletedBy: {
        _id: Types.ObjectId;
        email: string;
    };

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
ReviewSchema.plugin(softDeletePlugin);
