export interface Me {
    id: number
    name: string
    email: string
    createProject: Project
    project: Project
    projects: Project[]
}

export interface Project {
    id: number
    name: string
    createSoftwareComponent: SoftwareComponent
    softwareComponents : SoftwareComponent[]
    softwareComponent : SoftwareComponent
}

export interface SoftwareComponent {
    id: number
    name: string
}

export interface LoginResult {
    token: string
}