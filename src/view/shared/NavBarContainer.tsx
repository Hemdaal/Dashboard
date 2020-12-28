import React from "react";
import '../AppComponent.css';
import NavBar from "./NavBar";
import {useMutation, useQuery} from '@apollo/react-hooks';
import {LOGOUT, ME_QUERY} from "../../repositories/UserRepository";
import {Me} from "../../repositories/GraphQLSchema";
import {useHistory} from "react-router-dom";

export default function NavBarContainer() {

    const {loading, error, data} = useQuery<{ me: Me }>(ME_QUERY);
    const [Logout, {loading: logoutLoading, error: logoutError, data: logoutData}] = useMutation<{ status: Boolean }>(LOGOUT);
    const history = useHistory();

    let name = "";
    if (data && data.me) {
        name = data.me.name
    }

    if (logoutData || logoutError) {
        localStorage.removeItem('token');
        history.push('/login')
    }

    return (
        <NavBar
            isLoading={loading || logoutLoading}
            userName={name}
            onLogin={() => {
                history.push('/login')
            }}
            onLogout={() => {
                logout(Logout)
            }}
        />);
}

function logout(Logout: any) {
    Logout({variables: {}})
}
