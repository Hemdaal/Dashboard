import {Project} from "../models/Project";
import {BaseRepository} from "./BaseRepository";

export const PROJECT_QUERY = `
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
    mutation createUser($name: String!) {
        user {
            createProject(name: $name) {
                id,
                name
            }
        }
    }
`;

export class ProjectRepository extends BaseRepository {

    getProjects(): Promise<Project[]> {
        return new Promise<Project[]>((resolve, reject) => {
            this.call(PROJECT_QUERY, {}).then(data => {
                resolve(data.user.projects.map((project: any) =>
                    Project.from(project)
                ));
            }).catch(error => reject(error))
        });
    }

    createProject(name: string): Promise<Project> {
        return new Promise<Project>((resolve, reject) => {
            this.call(CREATE_PROJECT_QUERY, {name: name}).then(data => {
                resolve(Project.from(data.user.createProject))
            }).catch(error => reject(error))
        });
    }
}
