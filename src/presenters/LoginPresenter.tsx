import UserRepository from "../repositories/UserRepository";
import LoginView from "../view/containers/LoginView";

class LoginPresenter {

    loginView : LoginView

    constructor(loginView : LoginView) {
        this.loginView = loginView
    }

    userRepository = new UserRepository()

    login(email:string, password:string) {
        this.loginView.showLoading(true)
        this.userRepository.login(email, password, (status => {
            if(status) {
                this.loginView.showSuccess()
            } else {
                this.loginView.showFailed()
            }
        }))
    }
}

export default LoginPresenter