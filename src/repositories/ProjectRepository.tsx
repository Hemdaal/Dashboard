import gql from "graphql-tag";

export const PROJECT_QUERY = gql`
    query me {
        me {
            id
            projects {
                id
                name
            }
        }
    }
`;

export const PROJECT_DETAIL_QUERY = gql`
    query me($projectId : Int!) {
        me {
            id
            project(projectId: $projectId) {
                id
                name
                softwareComponents {
                    id
                    name
                }
            }
        }
    }
`;

export const CREATE_PROJECT = gql`
    mutation CreateProject($name: String!) {
        me {
            id
            createProject(name : $name) {
                id
                name
            }
            projects {
                id
                name
            }
        }
    }
`;