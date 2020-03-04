export interface Me {
    id:string
    name:string
    email:string
    createProject : CreateProjectResult
}

export interface CreateProjectResult {
    id: number
    name: string
}

export interface LoginResult {
    token : string
}