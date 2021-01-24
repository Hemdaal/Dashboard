import {WidgetType} from "./WidgetType";
import {CommitWidget} from "./CommitWidget";

export abstract class ProjectWidget {
    id: number;
    projectId: number;
    type: WidgetType;
    additionalInfo: string;

    constructor(id: number, projectId: number, type: WidgetType, additionalInfo: string) {
        this.id = id;
        this.projectId = projectId;
        this.type = type;
        this.additionalInfo = additionalInfo;
    }

    static from (json: any): ProjectWidget {
        const id = json.id;
        const projectId = json.projectId;
        const type = json.type as WidgetType;
        const additionalInfo = json.additionalInfo;

        if(type == WidgetType.COMMIT) {
            return new CommitWidget(id, projectId, type, additionalInfo)
        } else {
            throw "Invalid type"
        }
    }
}
