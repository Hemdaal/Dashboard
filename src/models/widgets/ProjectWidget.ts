import {WidgetType} from "./WidgetType";

export abstract class ProjectWidget {
    id: number;
    type: WidgetType;
    additionalInfo: string;

    constructor(id: number, type: WidgetType, additionalInfo: string) {
        this.id = id;
        this.type = type;
        this.additionalInfo = additionalInfo;
    }
}
