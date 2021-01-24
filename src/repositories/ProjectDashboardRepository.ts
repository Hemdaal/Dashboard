import {BaseRepository} from "./BaseRepository";
import {ProjectDashboard} from "../models/ProjectDashboard";

export const PROJECT_DASHBOARD_QUERY = `
    query projectDashboard($projectId: Long!) {
        user {
            projectDashboard(projectId: $projectId) {    
                projectId,
                orderedWidgets {
                    id,
                    projectId,
                    type,
                    additionalInfo
                }
            }
        }
    }
`;

export class ProjectDashboardRepository extends BaseRepository {

    getDashboard(projectId: number): Promise<ProjectDashboard> {
        return new Promise<ProjectDashboard>((resolve, reject) => {
            this.call(PROJECT_DASHBOARD_QUERY, {projectId: projectId}).then(response => {
                console.log(response);
                resolve(ProjectDashboard.from(response.data.user.projectDashboard))
            }).catch(error => {
                console.error(error);
                return reject(error);
            })
        });

    }
}
