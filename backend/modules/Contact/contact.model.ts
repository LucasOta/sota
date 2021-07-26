import { Schema, Document, model } from 'mongoose';

const contactSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    company: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phone: {
        type: String
    },
    country: {
        type: String
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    newsletter: {
        type: Boolean,
        default: true
    },
    read: {
        type: Boolean,
        default: false
    },

    created: {
        type: Date
    },
    modified: {
        type: Date
    },
    deleted: {
        type: Date
    }

});

contactSchema.pre<IContact>('save', function (next) {
    this.created = new Date();
    next();
});

export interface IContact extends Document {
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    message: string;
    newsletter: boolean;
    read: boolean;

    created?: Date;
    modified?: Date;
    deleted?: Date;
}

export const Contact = model<IContact>('Contact', contactSchema);
