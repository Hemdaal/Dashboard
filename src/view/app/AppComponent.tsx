import React from 'react';
import LoginPageContainer from "../pages/login/LoginPageContainer";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CreateProjectPageContainer from "../pages/createProject/CreateProjectPageContainer";
import SignUpPageContainer from "../pages/signup/SignUpPageContainer";
import ErrorComponent from "../shared/ErrorComponent";

export default function AppComponent() {

    return (
        <BrowserRouter>
            <div className="root">
                <Switch>
                    <Route path="/createProject" component={CreateProjectPageContainer}/>
                    <Route path="/signup" exact><SignUpPageContainer/></Route>
                    <Route path="/login" exact><LoginPageContainer/></Route>
                    <Route path="*" exact><ErrorComponent/></Route>
                </Switch>
            </div>
        </BrowserRouter>);
}

