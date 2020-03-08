import gql from "graphql-tag";

export const ME_QUERY = gql`
    query me {
        me {
            id
            name
            email
        }
    }
`;

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout {
        logout
    }
`

export const SIGNUP = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!) {
        createUser(name : $name, email: $email, password: $password) {
            token
        }
    }
`;