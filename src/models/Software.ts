import {CodeManagementCreateInfo} from "./ProjectCreateInfo";
import {SoftwareRepository} from "../repositories/SoftwareRepository";
import {CodeManagement} from "./CodeManagement";

export default class Software {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    static from (json: any) : Software {
        return new Software(json.id, json.name)
    }

    setCodeManagement(projectId: number, codeManagementInfo: CodeManagementCreateInfo): Promise<CodeManagement> {
        const softwareRepository = new SoftwareRepository();

        return new Promise<CodeManagement>((resolve, reject) => {
            softwareRepository.setCodeManagement(projectId, this.id, codeManagementInfo).then(codeManagement => {
                resolve(codeManagement)
            }).catch(error => reject(error))
        })
    }
}
