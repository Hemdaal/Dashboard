import {CodeManagementCreateInfo} from "./ProjectCreateInfo";
import {SoftwareRepository} from "../repositories/SoftwareRepository";
import {CodeManagement} from "./CodeManagement";

export default class Software {
    id: number;
    projectId: number;
    name: string;

    constructor(id: number, projectId: number, name: string) {
        this.id = id;
        this.projectId = projectId;
        this.name = name;
    }

    static from (json: any) : Software {
        return new Software(json.id, json.projectId, json.name)
    }

    setCodeManagement(codeManagementInfo: CodeManagementCreateInfo): Promise<CodeManagement> {
        const softwareRepository = new SoftwareRepository();

        return new Promise<CodeManagement>((resolve, reject) => {
            softwareRepository.setCodeManagement(this.projectId, this.id, codeManagementInfo).then(codeManagement => {
                resolve(codeManagement)
            }).catch(error => reject(error))
        })
    }
}
