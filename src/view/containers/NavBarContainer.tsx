import React from "react";
import '../components/AppComponent.css';
import NavBar from "../components/NavBar";
import gql from "graphql-tag";
import {useQuery} from '@apollo/react-hooks';

const ME_QUERY = gql`
    query me {
        id
        name
        email
    }
`

export default function NavBarContainer() {

    const { loading, error, data } = useQuery(ME_QUERY)

    let name: string = data

    return (<NavBar isLoading={loading} userName={name}/>);
}