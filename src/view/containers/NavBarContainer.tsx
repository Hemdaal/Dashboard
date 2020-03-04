import React from "react";
import '../components/AppComponent.css';
import NavBar from "../components/NavBar";
import {useQuery} from '@apollo/react-hooks';
import {ME_QUERY} from "../../repositories/UserRepository";
import {Me} from "../../repositories/GraphQLSchema";
import {useHistory} from "react-router-dom";

export default function NavBarContainer() {

    const {loading, error, data} = useQuery<{ me: Me }>(ME_QUERY);
    const history = useHistory();

    let name = ""
    if (data && data.me) {
        name = data.me.name
    }

    return (
        <NavBar
            isLoading={loading}
            userName={name}
            onLogin={() => {
                history.push('/login')
            }}
            onLogout={() => {
                localStorage.removeItem('token');
                history.push('/login')
            }}
        />);
}