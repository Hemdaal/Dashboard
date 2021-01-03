import Software from "../models/Software";
import {CodeManagementCreateInfo} from "../models/ProjectCreateInfo";
import {CodeManagement} from "../models/CodeManagement";
import {BaseRepository} from "./BaseRepository";

export const ADD_SOFTWARE_QUERY = `
    mutation createUser($projectId: number!, $name: String!) {
        user {
            project(projectId: $projectId) {
                createSoftwareComponent(name: $name) {
                    id
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
            this.call(ADD_SOFTWARE_QUERY, {projectId: projectId, name: name}).then(data => {
                resolve(Software.from(data.user.project.createSoftwareComponent));
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
            }).then(data => {
                resolve(CodeManagement.from(data.user.project.softwareComponent.setCodeManagementTool));
            }).catch(error => reject(error))
        })
    }
}
