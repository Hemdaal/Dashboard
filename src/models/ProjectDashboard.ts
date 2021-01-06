import {ProjectWidget} from "./widgets/ProjectWidget";
import {WidgetType} from "./widgets/WidgetType";
import {CommitWidget} from "./widgets/CommitWidget";

export class ProjectDashboard {
    projectId: number;
    widgets: ProjectWidget[];

    constructor(projectId: number, widgets: ProjectWidget[]) {
        this.projectId = projectId;
        this.widgets = widgets;
    }

    static from(json: any): ProjectDashboard {
        const widgets: ProjectWidget[] = [];
        const projectId = Number(json.projectId);

        json.widgets.map((value: any) => {
            const id = value.id;
            const type = value.type;
            const additionalInfo = value.additionalInfo;
            if(type.name == WidgetType.COMMIT) {
                const commitWidget = new CommitWidget(id, WidgetType.COMMIT, additionalInfo);
                widgets.push(commitWidget);
            }
        });

        return new ProjectDashboard(projectId, widgets);
    }
}
