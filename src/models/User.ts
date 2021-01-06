import {Project} from "./Project";
import {ProjectRepository} from "../repositories/ProjectRepository";

export class User {
    id: number;
    name: string;
    email: string;

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static from(json: any): User {
        return new User(json.id, json.name, json.email);
    }

    getProjects(): Promise<Project[]> {
        const projectRepository = new ProjectRepository();
        return projectRepository.getProjects();
    }

    getProject(projectId: number): Promise<Project> {
        const projectRepository = new ProjectRepository();
        return projectRepository.getProject(projectId);
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
