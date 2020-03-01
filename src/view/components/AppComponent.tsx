import React from 'react';
import LoginContainer from "../containers/LoginContainer";
import NavBarContainer from "../containers/NavBarContainer";

export default function AppComponent() {

    return (
        <div>
            <div>
                <NavBarContainer/>
            </div>
            <div>
                <LoginContainer/>
            </div>
        </div>
    );
}

