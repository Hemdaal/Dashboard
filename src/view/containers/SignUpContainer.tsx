import NavBarContainer from "./NavBarContainer";
import React, {useState} from "react";
import SignUpComponent from "../components/SignUpComponent";
import {useHistory} from "react-router-dom";

function signUp(name: string, email: string, password: string) {

}

export default function SignUpContainer() {
    const [name, setName] = useState("");
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
                <SignUpComponent
                    name={name}
                    email={email}
                    password={password}
                    rememberMe={rememberMe}
                    onNameChange={setName}
                    onEmailChange={setEmail}
                    onPasswordChange={setPassword}
                    onRememberMeChange={setRememberMe}
                    onSignUpClick={() => {
                        signUp(name, email, password)
                    }}
                    onLoginClick={() => {
                        history.push('/login')
                    }}
                />
            </div>
        </div>

    );
}