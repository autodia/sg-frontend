import { Type } from 'class-transformer';
import { User } from 'src/app/common/model/user';

/**
 * @module Project
 */
export class Project {
    _id: string

    @Type(() => Date)
    created: Date = new Date()

    @Type(() => User)
    author: User

    name: string

    description: string

    @Type(() => User)
    contacts: User[] = []

    public constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }

    contactsToString(): string {
        let comma = this.contacts.map(user => user.profile.display_name).join(", ")
        if (!comma.includes(",")) return comma

        let lastIdx = comma.lastIndexOf(", ")

        let beginString = comma.substring(0, lastIdx);
        let endString = comma.substring(lastIdx-1 + " & ".length);

        return beginString + " & " + endString;
    }
}