import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Project } from './project';
import { Injectable } from '@angular/core';

export interface AllProjectNamesQueryResponse {
    projects: Project[];
    loading: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class GetAllProjectNamesService extends Query<AllProjectNamesQueryResponse> {
    document = gql`
        query { 
            projects {
                name
            }
        }`;
}
