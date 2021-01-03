import Software from "./Software";
import {SoftwareRepository} from "../repositories/SoftwareRepository";

export class Project {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    addSoftWare(name: string): Promise<Software> {
        const softwareRepository = new SoftwareRepository();
        return new Promise<Software>((resolve, reject) => {
            softwareRepository.addSoftware(this.id, name)
                .then(addedSoftware => resolve(addedSoftware))
                .catch(error => reject(error))
        })
    }
}
