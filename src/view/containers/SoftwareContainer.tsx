import React from "react";
import ErrorComponent from "../components/ErrorComponent";
import NavBarContainer from "./NavBarContainer";

export default function SoftwareContainer() {

    return (
        <div>
            <NavBarContainer/>
            <ErrorComponent/>
        </div>
    );
}