import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CreateProjectService extends Mutation {
  document = gql`
    mutation createProject($projectInput: ProjectInput!) {
      createProject(projectInput: $projectInput) {
        _id
      }
    }`
  ;
}