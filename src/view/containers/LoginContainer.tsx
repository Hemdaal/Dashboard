import React, {useState} from "react";
import LoginComponent from "../components/LoginComponent";
import NavBarContainer from "./NavBarContainer";
import { useHistory } from "react-router-dom";
import {isValidEmail} from "../../utils/ValidationUtils";

function login(email:string, password:string) {

}

function validate(email:string, password:string) : boolean {
    return isValidEmail(email) && password.length > 4
}

export default function LoginContainer() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const history = useHistory();

    return (
        <div>
            <div>
                <NavBarContainer/>
            </div>
            <div>
                <LoginComponent
                    email={email}
                    password={password}
                    rememberMe={rememberMe}
                    onEmailChange={setEmail}
                    onPasswordChange={setPassword}
                    onRememberMe={setRememberMe}
                    onLoginClick={() => {
                        login(email, password)
                    }}
                    onSignupClick={() => {
                        history.push('/signup')
                    }}
                    validate={() => validate(email, password)}
                />
            </div>
        </div>

    );
}