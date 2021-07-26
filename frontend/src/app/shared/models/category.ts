import { Translation } from "./translation";
export class Category {
    _id?: number;
    name: Translation[];
    img?: string;
    parent?: Category;

    created?: Date;
    modified?: Date;
    deleted?: Date;
}