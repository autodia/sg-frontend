import gql from 'graphql-tag';

// 2
export const LOGIN_QUERY = gql
    `query login($username:String!, $password:String!){
          login(username: $username, password: $password) {
            token
          }
      }`

export interface LoginQueryResponse {
    login: {
        token: string
    };
    loading: boolean;
}