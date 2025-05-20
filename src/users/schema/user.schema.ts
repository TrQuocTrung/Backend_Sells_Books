import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;
@Schema({ _id: false })
class Profile {
    @Prop()
    fullname: string
    @Prop()
    address: string
    @Prop()
    gender: string
    @Prop()
    phone: number
    @Prop()
    age: number
}
@Schema({ timestamps: true })
export class User {
    @Prop()
    username: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    role: string

    @Prop({ type: () => Profile })
    profile: Profile

    @Prop()
    refreshToken: string;

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
export const UserSchema = SchemaFactory.createForClass(User);