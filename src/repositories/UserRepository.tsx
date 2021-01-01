import {User} from "../models/User";
import {BaseRepository} from "./BaseRepository";
import {AuthInfo} from "../models/AuthInfo";

export const USER_QUERY = `
    query user {
        user {
            id
            name
            email
        }
    }
`;

export const LOGIN = `
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export const LOGOUT = `
    mutation Logout {
        logout
    }
`;

export const SIGNUP = `
    mutation CreateUser($name: String!, $email: String!, $password: String!) {
        createUser(name : $name, email: $email, password: $password) {
            token
        }
    }
`;

export class UserRepository extends BaseRepository {

    async login(email: string, password: string): Promise<AuthInfo> {
        return new Promise<AuthInfo>((resolve, reject) => {
            this.call(LOGIN, {email: email, password: password}).then(response => {
                resolve(response.data.login);
            }).catch(error => {
                console.error(error);
                return reject(error);
            })
        });
    }

    async signup(name: string, email: string, password: string): Promise<AuthInfo> {
        return new Promise<AuthInfo>((resolve, reject) => {
            this.call(SIGNUP, {name: name, email: email, password: password}).then(response => {
                resolve(response.data.createUser)
            }).catch(error => reject(error))
        });
    }

    async getUser(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.call(USER_QUERY, {}).then(response => {
                resolve(response.data.user)
            }).catch(error => reject(error))
        });
    }

    async logout(): Promise<boolean> {
        this.resetUserToken();
        return new Promise<boolean>((resolve, reject) => {
            this.call(LOGOUT, {}).then(response => {
                resolve(true)
            }).catch(error => resolve(true))
        });
    }

    saveUserToken(token: string) {
        localStorage.setItem('token', token);
    }

    resetUserToken() {
        localStorage.setItem('token', '')
    }
}
