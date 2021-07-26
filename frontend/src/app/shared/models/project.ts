import { Translation } from "./translation";
import { Client } from "./client";
import { Industry } from "./industry";
import { Discipline } from "./discipline";
import { Item } from './item';

export class Project {
    _id?: number;
    order: number;
    title: Translation[];
    description: Translation[];

    coverImg: string;
    thumbnail: string;

    featured: boolean;
    playground: boolean;

    blocks: Block[];

    clients: Client[];
    industries: Industry[];
    disciplines: Discipline[];
    
    _show: boolean;

    created?: Date;
    modified?: Date;
    deleted?: Date;
}

export class Block {
    bgColor: string;
    fontColor: string;

    items: Item[];
}