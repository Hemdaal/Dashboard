export class AuthInfo {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    static from(json: any): AuthInfo {
        return new AuthInfo(json.token)
    }
}
