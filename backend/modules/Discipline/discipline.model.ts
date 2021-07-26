import { Schema, Document, model } from 'mongoose';
import { Translation } from "../../classes/translation";

const disciplineSchema = new Schema({

    name: [
        {
            _id:false,
            language: String,
            quote: String,
        }
    ],

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

disciplineSchema.pre<IDiscipline>('save', function (next) {
    this.created = new Date();
    next();
});

export interface IDiscipline extends Document {
    name: Translation[];

    created?: Date;
    modified?: Date;
    deleted?: Date;
}

export const Discipline = model<IDiscipline>('Discipline', disciplineSchema);