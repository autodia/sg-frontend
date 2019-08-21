import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Project } from './project';
import { Injectable } from '@angular/core';

export interface GetProjectQueryResponse {
    project: Project;
    loading: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class GetProjectService extends Query<GetProjectQueryResponse> {
    document = gql`
        query project($id: ID!) { 
            project(id: $id) {
                    _id
                    created
                    author {
                        _id
                        username
                    }
                    name
                    description
                    contacts {
                        _id
                        username
                    }
                }
        }`;
}
