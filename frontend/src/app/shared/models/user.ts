export class User {
    _id: number;
    name: string;
    email: string;
    level: number;
    password: string;
    img?: string;

    created: Date;
    modified: Date;
    deleted: Date;

    token: string;
}