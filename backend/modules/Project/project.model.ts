import { Schema, Document, model } from 'mongoose';
import { Translation } from "../../classes/translation";


const itemSchema = new Schema({
    timestamp: {
        type: String
        // This ID will be the timestamp of when the user create the Item
        // we will use this to relate the images
    },
    order: {
        type: Number
    },
    typeOfItem: {
        type: Number
        // 01 - Title
        // 02 - Text
        // 03 - Video
        // 04 - Image
        // 05 - Image Group
        // 06 - Testimonial
        // 07 - Text + Image
    },
    title: [
        {
            _id:false,
            language: String,
            quote: String,
        }
    ],
    subtitle: [
        {
            _id:false,
            language: String,
            quote: String,
        }
    ],
    description: [
        {
            _id:false,
            language: String,
            quote: String,
        }
    ],
    video: { //Link
        type: String
    },
    img: [{
        type: String,
        default: 'item_def.jpg'
    }],
    fullWidth: {
        type: Boolean,
        default: false
    },
    testimonial:{
        name: {type: String},
        quote: [
            {
                _id:false,
                language: String,
                quote: String,
            }
        ],
        jobTitle: [
            {
                _id:false,
                language: String,
                quote: String,
            }
        ],
    }

});

const blockSchema = new Schema({

    order: {
        type: Number
    },
    bgColor: {
        type: String
    },
    fontColor: {
        type: String
    },
    items: [itemSchema],

});


const projectSchema = new Schema({

    title: [
        {
            _id:false,
            language: String,
            quote: String,
        }
    ],
    description: [
        {
            _id:false,
            language: String,
            quote: String,
        }
    ],
    coverImg: {
        type: String,
        default: 'project_def.jpg'
    },
    thumbnail: {
        type: String,
        default: 'project_def.jpg'
    },
    order: {
        type: Number
    },
    featured: {
        type: Boolean,
        default: false
    },
    playground: {
        type: Boolean,
        default: false
    },

    blocks: [blockSchema],

    clients: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }],
    industries: [{
        type: Schema.Types.ObjectId,
        ref: 'Industry'
    }],
    disciplines: [{
        type: Schema.Types.ObjectId,
        ref: 'Discipline'
    }],

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

projectSchema.pre<IProject>('save', function (next) {
    this.created = new Date();
    next();
});

export interface IProject extends Document {
    order: number;
    title: Translation[];
    description: Translation[];
    coverImg: string;
    thumbnail: string;
    featured: boolean;
    playground: boolean;
    
    blocks: [IBlock],

    clients: [string],
    industries: [string],
    disciplines: [string],

    created?: Date;
    modified?: Date;
    deleted?: Date;
}
interface IBlock {    
    order: number,
    bgColor: string,
    fontColor: string,
    items: IItem[]
}
export interface IItem {
    timestamp: string,
    order: number,
    typeOfItem: number,
    title?: Translation[],
    subtitle?: Translation[],
    description?: Translation[],
    video?: string,
    img?: string[],
    fullWidth?: boolean,
    testimonial?:{
        name: string,
        quote: Translation[],
        jobTitle: Translation[],
    }
}


export const Project = model<IProject>('Project', projectSchema);