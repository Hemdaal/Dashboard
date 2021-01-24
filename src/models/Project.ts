import Software from "./Software";
import {SoftwareRepository} from "../repositories/SoftwareRepository";
import {ProjectDashboard} from "./ProjectDashboard";
import {ProjectDashboardRepository} from "../repositories/ProjectDashboardRepository";
import {ProjectRepository} from "../repositories/ProjectRepository";

export class Project {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    static from(json: any): Project {
        return new Project(json.id, json.name);
    }

    addSoftWare(name: string): Promise<Software> {
        const softwareRepository = new SoftwareRepository();
        return new Promise<Software>((resolve, reject) => {
            softwareRepository.addSoftware(this.id, name)
                .then(addedSoftware => resolve(addedSoftware))
                .catch(error => reject(error))
        })
    }

    getProjectDashboard(): Promise<ProjectDashboard> {
        const projectDashboardRepository = new ProjectDashboardRepository();
        return projectDashboardRepository.getDashboard(this.id)
    }

    syncMetrics(): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            new ProjectRepository().syncMetrics(this.id).then(() => {
                resolve(true);
            }).catch(error => reject(error))
        })
    }
}
