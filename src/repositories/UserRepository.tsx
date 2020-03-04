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

export interface UserInfo {
    id:string
    name:string
    email:string
}