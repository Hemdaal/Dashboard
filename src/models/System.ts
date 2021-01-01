import {UserRepository} from "../repositories/UserRepository";
import {User} from "./User";

export class System {

    static instance: System;

    static getInstance(): System {
        if (!this.instance) {
            this.instance = new System();
        }

        return this.instance;
    }

    private userRepository: UserRepository;

    private constructor() {
        this.userRepository = new UserRepository();
    }

    login(email: string, password: string): Promise<User> {
        this.userRepository.resetUserToken();
        return new Promise<User>((resolve, reject) => {
            this.userRepository.login(email, password).then(authInfo => {
                this.userRepository.saveUserToken(authInfo.token);
                this.userRepository.getUser().then(user => {
                    resolve(user)
                }).catch(error => reject(error))

            }).catch(error => reject(error))
        });
    }

    signup(name: string, email: string, password: string): Promise<User> {
        this.userRepository.resetUserToken();
        return new Promise<User>((resolve, reject) => {
            this.userRepository.signup(name, email, password).then(authInfo => {
                this.userRepository.saveUserToken(authInfo.token);
                this.userRepository.getUser().then(user => {
                    resolve(user)
                }).catch(error => reject(error))

            }).catch(error => reject(error))
        });
    }

    getAccess(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.userRepository.getUser().then(user => {
                resolve(user)
            }).catch(error => reject(error))
        })
    }

    async logout() {
        await this.userRepository.logout()
    }
}
