import { Translation } from "./translation";
export class Discipline {
    _id?: number;
    name: Translation[];
    hasCombinations: boolean;

    created?: Date;
    modified?: Date;
    deleted?: Date;
}