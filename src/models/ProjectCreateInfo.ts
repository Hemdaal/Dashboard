import {CodeManagementRepoType} from "./CodeManagementRepoType";

export class ProjectCreateInfo {
    name: string = '';
    softwares: SoftwareCreateInfo[] = [];

    isValidData(): boolean {

        if (!this.name || !this.name.trim()) {
            return false;
        }

        if (this.softwares.length == 0) {
            return false;
        }

        const isValidSoftwares = this.softwares.some((software, index) => {
            if (!software.isValid()) {
                return false;
            }

            if(index == this.softwares.length -1) {
                return true;
            }
        });

        if(!isValidSoftwares) {
            return false;
        }


        return true;
    }

}

export class SoftwareCreateInfo {
    name: string = '';
    enableCodeManagement: boolean = false;
    codeManagement: CodeManagementCreateInfo = new CodeManagementCreateInfo();

    isValid(): boolean {

        if (!this.name || !this.name.trim()) {
            return false
        }

        if (this.enableCodeManagement === false) {
            return false;
        }

        if (!this.codeManagement.isValid()) {
            return false;
        }

        return true;
    }
}

export class CodeManagementCreateInfo {
    type: CodeManagementRepoType = CodeManagementRepoType.GITHUB;
    url: string = '';
    token: string = '';

    isValid(): boolean {

        if (!this.url && !this.url.trim()) {
            return false;
        }

        return true;
    }
}
