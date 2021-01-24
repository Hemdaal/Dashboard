import {Project} from "../models/Project";
import {BaseRepository} from "./BaseRepository";

export const PROJECT_QUERY = `
    query project($projectId: Long!) {
        user {
            project(projectId: $projectId) {
                id
                name
            }
        }
    }
`;

export const PROJECTS_QUERY = `
    query project {
        user {
            projects {
                id
                name
            }
        }
    }
`;

export const CREATE_PROJECT_QUERY = `
    mutation createProject($name: String!) {
        user {
            createProject(name: $name) {
                id,
                name
            }
        }
    }
`;

export const SYNC_PROJECT_QUERY = `
    mutation setCodeManagementTool($projectId: Long!) {
        user {
            project(projectId: $projectId) {
                sync
            }
        }
    }
`;

export class ProjectRepository extends BaseRepository {

    getProjects(): Promise<Project[]> {
        return new Promise<Project[]>((resolve, reject) => {
            this.call(PROJECTS_QUERY, {}).then(response => {
                resolve(response.data.user.projects.map((project: any) =>
                    Project.from(project)
                ));
            }).catch(error => reject(error))
        });
    }

    getProject(projectId: number): Promise<Project> {
        return new Promise<Project>((resolve, reject) => {
            this.call(PROJECT_QUERY, {projectId: projectId}).then(response => {
                resolve(Project.from(response.data.user.project));
            }).catch(error => {
                reject(error)
            })
        });
    }

    createProject(name: string): Promise<Project> {
        return new Promise<Project>((resolve, reject) => {
            this.call(CREATE_PROJECT_QUERY, {name: name}).then(response => {
                resolve(Project.from(response.data.user.createProject))
            }).catch(error => reject(error))
        });
    }

    syncMetrics(projectId: number): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            this.call(SYNC_PROJECT_QUERY, {projectId: projectId}).then(response => {
                resolve(true);
            }).catch(error => {
                reject(error)
            })
        });
    }
}
