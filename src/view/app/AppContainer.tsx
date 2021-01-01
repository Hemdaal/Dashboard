import React from "react";
import './AppComponent.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SoftwareContainer from "../pages/software/SoftwareContainer";
import DashboardContainer from "../pages/dashboard/DashboardContainer";
import SignUpContainer from "../pages/signup/SignUpContainer";
import LoginContainer from "../pages/login/LoginContainer";
import ErrorComponent from "../shared/ErrorComponent";
import CreateProjectContainer from "../pages/createProject/CreateProjectContainer";


class AppContainer extends React.Component {

    state = {
        logged_in: false
    };

    render() {
        return (
            <BrowserRouter>
                <div className="root">
                    <Switch>
                        <Route path="/project/:projectId/software/:softwareId" component={SoftwareContainer} exact/>
                        <Route path="/project/:projectId/dashboard" component={DashboardContainer}/>
                        <Route path="/createProject" component={CreateProjectContainer}/>
                        <Route path="/signup" exact><SignUpContainer/></Route>
                        <Route path="/login" exact><LoginContainer/></Route>
                        <Route path="/" exact><DashboardContainer/></Route>
                        <Route path="*" exact><ErrorComponent/></Route>
                    </Switch>
                </div>
            </BrowserRouter>)
    }
}

export default AppContainer
