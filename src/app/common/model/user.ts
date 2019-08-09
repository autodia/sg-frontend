/**
 * @module Model
 */

import { Type } from 'class-transformer';
// import { Profile } from './profile';

/**
 * @module Authentication
 */
export class User {
    id: number

    exp: number

    name: string

    // @Type(() => Profile)
    // profile: Profile;
}