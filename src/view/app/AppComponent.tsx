import React from 'react';
import NavBarContainer from "../shared/NavBarContainer";
import LoginContainer from "../pages/login/LoginContainer";

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

