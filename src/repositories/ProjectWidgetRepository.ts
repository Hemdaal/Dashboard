import {WidgetType} from "../models/widgets/WidgetType";
import {ProjectWidget} from "../models/widgets/ProjectWidget";
import {BaseRepository} from "./BaseRepository";

const ADD_WIDGET_QUERY = `
query projectDashboard(
  $projectId: Long!, 
  $type: ProjectWidgetType!, 
  $additionalInfo: String!
) {
    user {
    projectDashboard(projectId: $projectId) {  
        addWidget(type: $type, additionalInfo: $additionalInfo) {
        id
      }
    }
  }
}
`;

export class ProjectWidgetRepository extends BaseRepository {

    addWidget(projectId: number, widgetType: WidgetType, additionalInfo: String): Promise<ProjectWidget> {
        return new Promise<ProjectWidget>((resolve, reject) => {
            this.call(ADD_WIDGET_QUERY, {projectId: projectId, type: widgetType, additionalInfo: additionalInfo}).then(response => {
                resolve(ProjectWidget.from(response.data.user.projectDashboard.addWidget))
            }).catch(error => reject(error))
        })
    }
}
