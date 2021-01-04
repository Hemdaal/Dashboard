import React, {useState} from "react";
import '../../app/AppComponent.css';
import NavBarComponent from "./NavBarComponent";
import {useHistory} from "react-router-dom";
import {System} from "../../../models/System";
import {User} from "../../../models/User";

export default function NavBarContainer() {

    const {loading, user, logout} = useLogin();
    const history = useHistory();

    return (
        <NavBarComponent
            isLoading={loading}
            user={user}
            onLogin={() => {
                history.push('/login')
            }}
            onLogout={() => {
                logout();
                history.push('/login')
            }}
        />);
}

function useLogin() {
    const [initialized, setInitialized] = useState(false);
    const system = System.getInstance();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    if (!initialized) {
        setInitialized(true);
        system.getAccess().then(user => {
            setLoading(false);
            setUser(user)
        }).catch(error => {
            setLoading(false);
            setUser(null);
        });
    }

    function logout() {
        system.logout()
    }

    return {loading, user, logout};
}
