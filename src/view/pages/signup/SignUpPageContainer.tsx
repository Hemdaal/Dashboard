import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {LoginResult} from "../../../repositories/GraphQLSchema";
import {SIGNUP} from "../../../repositories/UserRepository";
import {isValidEmail} from "../../../utils/ValidationUtils";
import SignUpPageComponent from "./SignUpPageComponent";

function signUp(name: string, email: string, password: string, Signup: any) {
    Signup({variables: {name: name, email: email, password: password}})
}

function validate(name: string, email: string, password: string): boolean {
    return name.length > 3 && isValidEmail(email) && password.length > 4
}

export default function SignUpPageContainer() {

    const [Signup, {loading, error, data}] = useMutation<{ createUser: LoginResult }>(SIGNUP);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const history = useHistory();

    if (data && data.createUser && data.createUser.token) {
        localStorage.setItem('token', data.createUser.token);
        history.push('/')
    }

    return (
        <SignUpPageComponent
            name={name}
            email={email}
            password={password}
            rememberMe={rememberMe}
            loading={loading}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onRememberMeChange={setRememberMe}
            onSignUpClick={() => {
                signUp(name, email, password, Signup)
            }}
            onLoginClick={() => {
                history.push('/login')
            }}
            validate={() => validate(name, email, password)}
        />
    );
}