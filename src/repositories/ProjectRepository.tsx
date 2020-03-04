import gql from "graphql-tag";

export const PROJECT_QUERY = gql`
    query me {
        me {
            projects {
                id
                name
            }
        }
    }
`;

export const CREATE_PROJECT = gql`
    mutation CreateProject($name: String!) {
        me {
            createProject(name : $name) {
                id
                name
            }
        }
    }
`;