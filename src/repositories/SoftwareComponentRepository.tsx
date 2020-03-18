import gql from "graphql-tag";

export const SOFTWARE_DETAIL_QUERY = gql`
    query me($projectId : Long!, $softwareId : Long!) {
        me {
            id
            project(projectId : $projectId) {
                id
                softwareComponent(softwareId : $softwareId) {
                    id
                    name
                }
            }
        }
    }
`;

export const CREATE_SOFTWARE = gql`
    mutation CreateSoftware($projectId : Long!, $name: String!, $collectorType : String!, $resourceUrl : String!, $token : String!) {
        me {
            id
            project(projectId : $projectId) {
                id
                createSoftwareComponent(name : $name, collectorsInfo: {
                    repoCollectorInfo : {
                        resourceUrl : $resourceUrl
                        token : $token
                        collectorType : $collectorType
                    }
                }) {
                    id
                    name
                }
            }
        }
    }
`;