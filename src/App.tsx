import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import LoginContainer from "./containers/LoginContainer";
// import { useQuery } from '@apollo/react-hooks';
// import gql from "graphql-tag";

// const GET_POKEMON_INFO = gql
//     `{
//         pokemons(first: 150) {
//             id
//             number
//             name,
//             image,
//             evolutions {
//                 id,
//                 number,
//                 name,
//                 image
//             }
//         }
//     }`
//
// const { data, loading, error } = useQuery(GET_POKEMON_INFO);

function App() {

    return (

        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <LoginContainer />
            </div>
        </div>
    )
}

export default App;
