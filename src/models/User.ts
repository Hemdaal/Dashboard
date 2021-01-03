import {Project} from "./Project";
import {ProjectRepository} from "../repositories/ProjectRepository";

export class User {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    static from(json: any): User {
        return new User(json.name, json.email);
    }

    getProjects(): Promise<Project[]> {
        const projectRepository = new ProjectRepository();
        return projectRepository.getProjects();
    }

    createProject(name: string): Promise<Project> {
        return new Promise<any>((resolve, reject) => {
            const projectRepository = new ProjectRepository();
            projectRepository.createProject(name)
                .then(createdProject => resolve(createdProject))
                .catch(error => reject(error));
        })
    }
}
