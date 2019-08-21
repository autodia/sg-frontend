import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import { User } from 'src/app/common/model/user';

export interface AllUsersQueryResponse {
    users: User[];
    loading: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class GetAllUsersService extends Query<AllUsersQueryResponse> {
    document = gql`
        query { 
            users {
                _id
                username
            }
        }`;
}
