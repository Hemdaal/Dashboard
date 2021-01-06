import {ProjectWidget} from "./ProjectWidget";

export class CommitWidget extends ProjectWidget {

    getSoftwareId(): number | null {
        if(this.additionalInfo) {
            return Number(this.additionalInfo)
        }

        return null;
    }
}
