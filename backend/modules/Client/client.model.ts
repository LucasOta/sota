import { Document, model, Schema } from "mongoose";

const clientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is needed"],
  },
  website: {
    type: String,
    required: [false],
  },

  created: {
    type: Date,
  },
  modified: {
    type: Date,
  },
  deleted: {
    type: Date,
  },
});

clientSchema.pre<IClient>("save", function (next) {
  this.created = new Date();
  next();
});

export interface IClient extends Document {
  name: string;
  website: string;

  created?: Date;
  modified?: Date;
  deleted?: Date;
}

export const Client = model<IClient>("Client", clientSchema);
