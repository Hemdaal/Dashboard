import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './view/containers/AppContainer';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import * as serviceWorker from './serviceWorker';
import {setContext} from 'apollo-link-context';
import {onError} from "apollo-link-error";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:8080/graphql'
})


const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: deepOrange,
    }
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');
    if (token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    } else {
        return {
            headers: {}
        }
    }

});

const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
        graphQLErrors.map(({message, locations, path}) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
    cache: cache,
    link: authLink.concat(errorLink).concat(link)
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <AppContainer/>
        </ThemeProvider>
    </ApolloProvider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
