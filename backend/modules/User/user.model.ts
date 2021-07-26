
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    level: { // 0- Client, 1-User, 2- Admin
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    img: {
        type: String,
        default: 'user_def.jpg'
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


userSchema.method('matchPassword', function (password: string = ''): boolean {

    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }

});

userSchema.pre<IUser>('save', function (next) {
    this.created = new Date();
    next();
});



export interface IUser extends Document {
    name: string;
    email: string;
    level: number;
    password: string;
    img?: string;

    created?: Date;
    modified?: Date;
    deleted?: Date;

    matchPassword(password: string): boolean;
}



export const User = model<IUser>('User', userSchema);
