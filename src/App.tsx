import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import LoginContainer from "./containers/LoginContainer";

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
