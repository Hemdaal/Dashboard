import Software from "../models/Software";
import {CodeManagementCreateInfo} from "../models/ProjectCreateInfo";
import {CodeManagement} from "../models/CodeManagement";
import {BaseRepository} from "./BaseRepository";

export const ADD_SOFTWARE_QUERY = `
    mutation createSoftware($projectId: Long!, $name: String!) {
        user {
            project(projectId: $projectId) {
                addSoftwareComponent(name: $name) {
                    id,
                    projectId,
                    name
                }
            }
        }
    }
`;

export const SET_CODE_MANAGEMENT_QUERY = `
    mutation setCodeManagementTool(
    $projectId: Long!, 
    $softwareId: Long!, 
    $repoToolType: RepoToolType!,
    $repoUrl: String!,
    $repoToken: String
    ) {
        user {
            project(projectId: $projectId) {
                softwareComponent(softwareId: $softwareId) {
                    setCodeManagementTool(repoToolType: $repoToolType, repoUrl: $repoUrl, repoToken: $repoToken) {
                        id,
                        token
                    }
                }
            }
        }
    }`
;

export class SoftwareRepository extends BaseRepository {

    addSoftware(projectId: number, name: string): Promise<Software> {
        return new Promise<Software>((resolve, reject) => {
            this.call(ADD_SOFTWARE_QUERY, {projectId: projectId, name: name}).then(response => {
                resolve(Software.from(response.data.user.project.addSoftwareComponent));
            }).catch(error => reject(error))
        })
    }

    setCodeManagement(projectId: number, softwareId: number, codeManagement: CodeManagementCreateInfo): Promise<CodeManagement> {
        return new Promise<CodeManagement>((resolve, reject) => {
            this.call(SET_CODE_MANAGEMENT_QUERY, {
                projectId: projectId,
                softwareId: softwareId,
                repoToolType: codeManagement.type,
                repoUrl: codeManagement.url,
                repoToken: codeManagement.token
            }).then(response => {
                resolve(CodeManagement.from(response.data.user.project.softwareComponent.setCodeManagementTool));
            }).catch(error => reject(error))
        })
    }
}
