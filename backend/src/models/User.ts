import mongoose from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    active: boolean;
}

const UserSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model<IUser>("User", UserSchema);
