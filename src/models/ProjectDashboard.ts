import {ProjectWidget} from "./widgets/ProjectWidget";
import {WidgetType} from "./widgets/WidgetType";
import {CommitWidget} from "./widgets/CommitWidget";
import {ProjectWidgetRepository} from "../repositories/ProjectWidgetRepository";

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

        json.orderedWidgets.map((value: any) => {
            const id = value.id;
            const projectId = value.projectId;
            const type = value.type;
            const additionalInfo = value.additionalInfo;
            if (type.name == WidgetType.COMMIT) {
                const commitWidget = new CommitWidget(id, projectId, WidgetType.COMMIT, additionalInfo);
                widgets.push(commitWidget);
            }
        });

        return new ProjectDashboard(projectId, widgets);
    }

    addWidget(type: WidgetType): Promise<ProjectWidget> {
        return new Promise<ProjectWidget>((resolve, reject) => {
            new ProjectWidgetRepository().addWidget(this.projectId, type, "").then(widget => {
                this.widgets.push(widget);
                resolve(widget);
            }).catch(error => reject(error))
        })
    }
}
