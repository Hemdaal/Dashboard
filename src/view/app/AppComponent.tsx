import React from 'react';
import NavBarContainer from "../shared/NavBarContainer";
import LoginPageContainer from "../pages/login/LoginPageContainer";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SoftwareContainer from "../pages/software/SoftwareContainer";
import DashboardContainer from "../pages/dashboard/DashboardContainer";
import CreateProjectPageContainer from "../pages/createProject/CreateProjectPageContainer";
import SignUpPageContainer from "../pages/signup/SignUpPageContainer";
import ErrorComponent from "../shared/ErrorComponent";

export default function AppComponent() {

    return (
        <BrowserRouter>
            <div className="root">
                <Switch>
                    <Route path="/project/:projectId/software/:softwareId" component={SoftwareContainer} exact/>
                    <Route path="/project/:projectId/dashboard" component={DashboardContainer}/>
                    <Route path="/createProject" component={CreateProjectPageContainer}/>
                    <Route path="/signup" exact><SignUpPageContainer/></Route>
                    <Route path="/login" exact><LoginPageContainer/></Route>
                    <Route path="/" exact><DashboardContainer/></Route>
                    <Route path="*" exact><ErrorComponent/></Route>
                </Switch>
            </div>
        </BrowserRouter>);
}

