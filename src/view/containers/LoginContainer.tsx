import React from "react";
import LoginComponent from "../components/LoginComponent";
import LoginPresenter from "../../presenters/LoginPresenter";
import LoginView from "./LoginView";

class LoginContainer extends React.Component implements LoginView {

    loginPresenter = new LoginPresenter(this)

    state = {
        is_login_progress : false,
        is_login_success : false,
        is_login_failed : false
    }

    render(): React.ReactNode {
        if(this.state.is_login_progress) {

        }
        return (<LoginComponent loginClick={this.onLoginClick}/>);
    }

    onLoginClick() : void {
        alert("login click")
    }

    showFailed(): void {
        this.setState({
            is_login_failed : true
        })
    }

    showLoading(show: boolean): void {

    }

    showSuccess(): void {
    }
}

export default LoginContainer