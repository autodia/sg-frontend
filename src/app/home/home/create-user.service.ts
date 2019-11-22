import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

export interface UserInput {
    username: string;
    email: string;
    password: string;
}

@Injectable({
  providedIn: 'root',
})
export class CreateUserService extends Mutation {
  document = gql`
    mutation createUser($userInput: UserInput!) {
      createUser(userInput: $userInput) {
        username
      }
    }`
  ;
}