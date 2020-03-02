import React, {useState} from "react";
import LoginComponent from "../components/LoginComponent";
import NavBarContainer from "./NavBarContainer";
import {useHistory} from "react-router-dom";
import {isValidEmail} from "../../utils/ValidationUtils";
import gql from "graphql-tag";
import {useMutation} from '@apollo/react-hooks';

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;


function login(email: string, password: string, Login:any) {
    Login({variables : {email:email, password:password}})
}

function validate(email: string, password: string): boolean {
    return isValidEmail(email) && password.length > 4
}

interface LoginResult {
    token : string
}

export default function LoginContainer() {

    const [Login, {error, data}] = useMutation<{login : LoginResult}>(LOGIN);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const history = useHistory();

    if(data?.login.token) {
        history.push('/signup')
    }

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
                        login(email, password, Login)
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