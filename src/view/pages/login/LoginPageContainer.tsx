import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {isValidEmail} from "../../../utils/ValidationUtils";
import LoginPageComponent from "./LoginPageComponent";
import {User} from "../../../models/User";
import {System} from "../../../models/System";

export default function LoginPageContainer() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const history = useHistory();
    const {error, loading, user, login} = useLogin();

    if (user) {
        history.push('/')
        return <div/>
    }

    return (
        <LoginPageComponent
            error={error}
            email={email}
            password={password}
            rememberMe={rememberMe}
            loading={loading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onRememberMe={setRememberMe}
            onLoginClick={() => {
                if (validate(email, password)) {
                    login(email, password);
                }
            }}
            onSignupClick={() => {
                history.push('/signup')
            }}
            validate={() => validate(email, password)}
        />
    );
}

function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const system = System.getInstance();

    function login(email: string, password: string) {
        setLoading(true);
        system.login(email, password).then(user => {
            setLoading(false);
            setUser(user);
        }).catch(error => {
            setLoading(false);
            setError(error);
        });
    }

    return {error, loading, user, login};
}

function validate(email: string, password: string): boolean {
    return isValidEmail(email) && password.length > 4
}
