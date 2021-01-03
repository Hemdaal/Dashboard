import Software from "../models/Software";
import {CodeManagementCreateInfo} from "../models/ProjectCreateInfo";
import {CodeManagement} from "../models/CodeManagement";

export class SoftwareRepository {

    addSoftware(projectId: number, name: string): Promise<Software> {
        return new Promise<Software>((resolve, reject) => {
            //TODO
        })
    }

    setCodeManagement(projectId: number, softwareId: number, codeManagement: CodeManagementCreateInfo): Promise<CodeManagement> {
        return new Promise<CodeManagement>((resolve, reject) => {
            //TODO
        })
    }
}
