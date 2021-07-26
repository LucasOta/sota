import { Translation } from "./translation";
export class Contact {
    _id?: number;
    name: string;
    company?: string;
    email: string;
    phone?: string;
    country?: string;
    message: string;
    newsletter: boolean;
    read: boolean;

    created?: Date;
    modified?: Date;
    deleted?: Date;
}