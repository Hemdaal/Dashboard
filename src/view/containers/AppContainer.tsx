import React from "react";
import '../components/AppComponent.css';
import LoginContainer from "./LoginContainer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUpContainer from "./SignUpContainer";

class AppContainer extends React.Component {

    state = {
        logged_in: false
    }

    render() {
        return (
            <BrowserRouter>
                <div className="root">
                    <Switch>
                        <Route path="/signup" exact><SignUpContainer /></Route>
                        <Route path="/login" exact><LoginContainer /></Route>
                    </Switch>
                </div>
            </BrowserRouter>)
    }
}

export default AppContainer