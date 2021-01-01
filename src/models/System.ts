import {UserRepository} from "../repositories/UserRepository";
import {User} from "./User";

export class System {
    private userRepository: UserRepository;

    constructor() {
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
}
