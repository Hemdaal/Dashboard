import {CodeManagementRepoType} from "./CodeManagementRepoType";

export class CodeManagement {
    id: number;
    repoType: CodeManagementRepoType;
    url: string;
    token: string | null;

    constructor(id: number, repoType: CodeManagementRepoType, url: string, token: string | null) {
        this.id = id;
        this.repoType = repoType;
        this.url = url;
        this.token = token;
    }
}
