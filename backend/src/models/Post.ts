import mongoose from "mongoose";

export interface ILike {
    user: mongoose.Schema.Types.ObjectId;
}

export interface IComment {
    user: mongoose.Schema.Types.ObjectId;
    name?: string;
    avatar?: string;
    text: string;
    date: Date;
}

export interface IPost {
    user: mongoose.Schema.Types.ObjectId;
    name?: string;
    avatar?: string;
    text: string;
    likes: ILike[];
    comments: IComment[]
}

const PostSchema = new mongoose.Schema<IPost>({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

export default mongoose.model<IPost>('Post', PostSchema);