import { Schema, Document, model } from 'mongoose';
import { Translation } from "../../classes/translation";

const industrySchema = new Schema({

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

industrySchema.pre<IIndustry>('save', function (next) {
    this.created = new Date();
    next();
});

export interface IIndustry extends Document {
    name: Translation[];

    created?: Date;
    modified?: Date;
    deleted?: Date;
}

export const Industry = model<IIndustry>('Industry', industrySchema);