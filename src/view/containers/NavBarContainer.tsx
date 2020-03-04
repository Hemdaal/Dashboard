import React from "react";
import '../components/AppComponent.css';
import NavBar from "../components/NavBar";
import {useQuery} from '@apollo/react-hooks';
import {ME_QUERY, UserInfo} from "../../repositories/UserRepository";

export default function NavBarContainer() {

    const { loading, error, data } = useQuery<{me: UserInfo}>(ME_QUERY);

    let name = ""
    if(data && data.me) {
        name = data.me.name
    }

    return (<NavBar isLoading={loading} userName={name}/>);
}