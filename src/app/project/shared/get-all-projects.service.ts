import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Project } from './project';
import { Injectable } from '@angular/core';

export interface AllProjectsQueryResponse {
    projects: Project[];
    loading: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class GetAllProjectService extends Query<AllProjectsQueryResponse> {
    document = gql`
        query { 
            projects {
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
