/**
 * @module Authentication
 */

export class User {
    _id: string

    exp: number

    username: string

    public constructor(init?:Partial<User>) {
        Object.assign(this, init);
    }
}