import gql from "graphql-tag";
import {User} from "../models/User";
import {BaseRepository} from "./BaseRepository";

export const ME_QUERY = gql`
    query me {
        me {
            id
            name
            email
        }
    }
`;

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;

export const SIGNUP = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!) {
        createUser(name : $name, email: $email, password: $password) {
            token
        }
    }
`;

export class UserRepository extends BaseRepository {

    async login(email: string, password: string): Promise<string> {
        return this.call(LOGIN, {email: email, password: password})
    }

    async signup(name: string, email: string, password: string): Promise<string> {
        return this.call(SIGNUP, {name: name, email: email, password: password})
    }

    async getUser(): Promise<User> {
        return this.call<User>(ME_QUERY, {});
    }

    saveUserToken(token: string) {
        localStorage.setItem('token', token);
    }

    resetUserToken() {
        localStorage.setItem('token', '')
    }
}
