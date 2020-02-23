import React from "react";
import LoginComponent from "../components/LoginComponent";
import LoginPresenter from "../../presenters/LoginPresenter";
import LoginView from "./LoginView";

class LoginContainer extends React.Component implements LoginView {

    loginPresenter = new LoginPresenter(this)

    state = {
        is_login_progress: false,
        is_login_failed: false
    }

    constructor(props:any) {
        super(props);
        this.onLoginClick = this.onLoginClick.bind(this)
        this.showFailed = this.showFailed.bind(this)
        this.showLoading = this.showLoading.bind(this)
    }

    render(): React.ReactNode {
        return (
            <LoginComponent isLoginInProgress = {this.state.is_login_progress} onLoginClick={this.onLoginClick}/>
        );
    }

    onLoginClick(email:string, password:string): void {
        this.loginPresenter.login(email, password)
    }

    showFailed(): void {
        this.setState({
            is_login_progress: false,
            is_login_failed: true
        })
    }

    showLoading(show: boolean): void {
        this.setState({
            is_login_progress: true
        })
    }

    showSuccess(): void {
        alert("success")
    }
}

export default LoginContainer