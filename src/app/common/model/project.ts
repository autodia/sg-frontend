import { User } from './user';
import { Type } from 'class-transformer';

/**
 * @module Project
 */


export class Project {
    id: number

    @Type(() => User)
    author: User

    name: string

    description: string

    @Type(() => User)
    contacts: User[] = []
}