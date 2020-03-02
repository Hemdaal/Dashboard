import React from "react";
import '../components/AppComponent.css';
import NavBar from "../components/NavBar";
import gql from "graphql-tag";
import {useQuery} from '@apollo/react-hooks';

const ME_QUERY = gql`
    query me {
        me {
            id
            name
            email   
        }
    }
`;

interface UserInfo {
    id:string
    name:string
    email:string
}

export default function NavBarContainer() {

    const { loading, error, data } = useQuery<{me: UserInfo}>(ME_QUERY);

    let name = ""
    if(data && data.me) {
        name = data.me.name
    }

    return (<NavBar isLoading={loading} userName={name}/>);
}