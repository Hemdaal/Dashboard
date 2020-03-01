import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './view/containers/AppContainer';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'https://graphql-pokemon.now.sh/'
})

const client = new ApolloClient({
    cache,
    link
})

ReactDOM.render(<ApolloProvider client={client}><AppContainer/></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
