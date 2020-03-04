export interface Me {
    id:string
    name:string
    email:string
    createProject : CreateProjectResult
    project : Project
    projects : Project[]
}

export interface Project {
    id: number
    name : string
}

export interface CreateProjectResult {
    id: number
    name: string
}

export interface LoginResult {
    token : string
}