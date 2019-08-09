/**
 * @module Authentication
 */

export class User {
    id: number

    exp: number

    name: string

    // @Type(() => Profile)
    // profile: Profile;

    public constructor(init?:Partial<User>) {
        Object.assign(this, init);
    }
}