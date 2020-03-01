import React from "react";
import '../components/AppComponent.css';
import AppComponent from "../components/AppComponent";

class AppContainer extends React.Component {

    state = {
        logged_in: false
    }

    render(): React.ReactNode {
        return (<AppComponent/>);
    }
}

export default AppContainer