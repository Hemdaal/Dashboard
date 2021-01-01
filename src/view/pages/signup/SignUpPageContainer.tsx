import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {isValidEmail} from "../../../utils/ValidationUtils";
import SignUpPageComponent from "./SignUpPageComponent";
import {User} from "../../../models/User";
import {System} from "../../../models/System";

export default function SignUpPageContainer() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const history = useHistory();
    const {error, loading, user, signup} = useSignup();

    if (user) {
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
                signup(name, email, password)
            }}
            onLoginClick={() => {
                history.push('/login')
            }}
            validate={() => validate(name, email, password)}
        />
    );
}

function useSignup() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const system = System.getInstance();

    function signup(name: string, email: string, password: string) {
        setLoading(true);
        system.signup(name, email, password).then(user => {
            setLoading(false);
            setUser(user);
        }).catch(error => {
            setLoading(false);
            setError(error);
        });
    }

    return {error, loading, user, signup};
}

function validate(name: string, email: string, password: string): boolean {
    return name.length > 3 && isValidEmail(email) && password.length > 4
}
