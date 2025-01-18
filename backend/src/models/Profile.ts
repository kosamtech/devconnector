import mongoose from "mongoose";

export interface IExperience {
    title: string;
    company: string;
    location?: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
}

export interface IEducation {
    school: string;
    degree: string;
    fieldOfStudy: string;
    from: Date;
    to?: Date;
    current: boolean;
    description: string;
}

export interface ISocial {
    youtube?: string;
    x?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
}

export interface IProfile {
    user: mongoose.Schema.Types.ObjectId;
    company?: string;
    website?: string;
    location?: string;
    status: string;
    skills: string[];
    bio?: string;
    githubusername: string;
    experience: IExperience[];
    education: IEducation[];
    social: ISocial;
}

const ProfileSchema = new mongoose.Schema<IProfile>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        company: {
            type: String,
        },
        website: {
            type: String,
        },
        location: {
            type: String,
        },
        status: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            required: true,
        },
        bio: {
            type: String,
        },
        githubusername: {
            type: String,
        },
        experience: [
            {
                title: {
                    type: String,
                    required: true,
                },
                company: {
                    type: String,
                    required: true,
                },
                location: {
                    type: String,
                },
                from: {
                    type: Date,
                    required: true,
                },
                to: {
                    type: String,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: {
                    type: String,
                },
            },
        ],
        education: [
            {
                school: {
                    type: String,
                    required: true,
                },
                degree: {
                    type: String,
                    required: true,
                },
                fieldOfStudy: {
                    type: String,
                    required: true,
                },
                from: {
                    type: Date,
                    required: true,
                },
                to: {
                    type: Date,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: {
                    type: String,
                    required: true,
                },
            },
        ],
        social: {
            youtube: {
                type: String,
            },
            x: {
                type: String,
            },
            facebook: {
                type: String,
            },
            linkedin: {
                type: String,
            },
        },
    },
    { timestamps: true },
);

export default mongoose.model<IProfile>("Profile", ProfileSchema);
