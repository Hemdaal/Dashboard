import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {isValidEmail} from "../../../utils/ValidationUtils";
import {useMutation} from '@apollo/react-hooks';
import {LOGIN} from "../../../repositories/UserRepository";
import {LoginResult} from "../../../repositories/GraphQLSchema";
import LoginComponent from "./LoginComponent";

function login(email: string, password: string, Login: any) {
    Login({variables: {email: email, password: password}})
}

function validate(email: string, password: string): boolean {
    return isValidEmail(email) && password.length > 4
}

export default function LoginContainer() {

    const [Login, {loading, error, data}] = useMutation<{ login: LoginResult }>(LOGIN);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const history = useHistory();

    if (data && data.login && data.login.token) {
        localStorage.setItem('token', data.login.token);
        history.push('/')
    }

    return (
        <LoginComponent
            email={email}
            password={password}
            rememberMe={rememberMe}
            loading={loading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onRememberMe={setRememberMe}
            onLoginClick={() => {
                login(email, password, Login)
            }}
            onSignupClick={() => {
                history.push('/signup')
            }}
            validate={() => validate(email, password)}
        />
    );
}
