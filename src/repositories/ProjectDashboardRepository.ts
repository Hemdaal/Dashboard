import {BaseRepository} from "./BaseRepository";
import {AuthInfo} from "../models/AuthInfo";
import {ProjectDashboard} from "../models/ProjectDashboard";

export const PROJECT_DASHBOARD_QUERY = `
    query project($projectId: Long!) {
        user {
            project(id: $projectId) {
                dashboard {
                    projectId
                    widgets: {
                        id,
                        type,
                        additionalInfo
                    }
                }
            }
        }
    }
`;

export class ProjectDashboardRepository extends BaseRepository {

    getDashboard(projectId: number): Promise<ProjectDashboard> {
        return new Promise<ProjectDashboard>((resolve, reject) => {
            this.call(PROJECT_DASHBOARD_QUERY, {projectId: projectId}).then(response => {
                resolve(ProjectDashboard.from(response.data.user.project.dashboard))
            }).catch(error => {
                console.error(error);
                return reject(error);
            })
        });

    }
}
