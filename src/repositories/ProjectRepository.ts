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

export class ProjectRepository extends BaseRepository {

    getProjects(): Promise<Project[]> {
        return new Promise<Project[]>((resolve, reject) => {
            this.call(PROJECT_QUERY, {}).then(data => {
                resolve(data.user.projects);
            }).catch(error => reject(error))
        });
    }

    createProject(name: string): Promise<Project> {
        return new Promise<Project>((resolve, reject) => {
            this.call(PROJECT_QUERY, {}).then(data => {
                //TODO
            }).catch(error => reject(error))
        });
    }
}
