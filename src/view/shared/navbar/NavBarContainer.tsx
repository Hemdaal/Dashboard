import React from "react";
import '../../app/AppComponent.css';
import NavBarComponent from "./NavBarComponent";
import {useHistory} from "react-router-dom";

export default function NavBarContainer() {

    //const {loading, error, data} = useQuery<{ me: Me }>(USER_QUERY);
    //const [Logout, {loading: logoutLoading, error: logoutError, data: logoutData}] = useMutation<{ status: Boolean }>(LOGOUT);
    const history = useHistory();

    return (
        <NavBarComponent
            isLoading={false}
            userName=''
            onLogin={() => {
                history.push('/login')
            }}
            onLogout={() => {

            }}
        />);
}

function logout(Logout: any) {
    Logout({variables: {}})
}
