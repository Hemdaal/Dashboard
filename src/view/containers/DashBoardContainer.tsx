import React, {useState} from "react";
import NavBarContainer from "./NavBarContainer";
import {useHistory} from "react-router-dom";
import DashBoardComponent from "../components/DashBoardComponent";

export default function DashBoardContainer() {

    const history = useHistory();

    let token = localStorage.getItem('token');
    if(token == null) {
        history.push('/login')
    }

    return (
        <div>
            <div>
                <NavBarContainer/>
            </div>
            <div>
                <DashBoardComponent />
            </div>
        </div>

    );
}