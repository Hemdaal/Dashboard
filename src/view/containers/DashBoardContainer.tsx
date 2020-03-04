import React, {useState} from "react";
import NavBarContainer from "./NavBarContainer";
import {useHistory} from "react-router-dom";
import DashBoardComponent from "../components/DashBoardComponent";
import {useQuery} from "@apollo/react-hooks";
import {ME_QUERY, UserInfo} from "../../repositories/UserRepository";


export default function DashBoardContainer() {

    const { loading, error, data } = useQuery<{me: UserInfo}>(ME_QUERY);
    const history = useHistory();

    let token = localStorage.getItem('token');
    if(token == null || error) {
        localStorage.removeItem('token')
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