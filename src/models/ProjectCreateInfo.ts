import {CodeManagementRepoType} from "./CodeManagementRepoType";

export class ProjectCreateInfo {
    name: string = '';
    softwares: SoftwareCreateInfo[] = [];
}

export class SoftwareCreateInfo {
    name: string = '';
    codeManagement: CodeManagementCreateInfo = new CodeManagementCreateInfo();
}

export class CodeManagementCreateInfo {
    type: CodeManagementRepoType = CodeManagementRepoType.GITHUB;
    url: string = '';
    token: string = '';
}
