import React from "react";
import '../components/AppComponent.css';
import LoginContainer from "./LoginContainer";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import SignUpContainer from "./SignUpContainer";
import DashboardContainer from "./DashboardContainer";
import AddSoftwareContainer from "./AddSoftwareContainer";
import ErrorComponent from "../components/ErrorComponent";

class AppContainer extends React.Component {

    state = {
        logged_in: false
    }

    render() {
        return (
            <BrowserRouter>
                <div className="root">
                    <Switch>
                        <Route path="/project/:projectId/addSoftware" component={AddSoftwareContainer} exact/>
                        <Route path="/project/:projectId" component={DashboardContainer}/>
                        <Route path="/project" component={DashboardContainer}/>
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