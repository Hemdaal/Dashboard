import React, {useState} from "react";
import CreateProjectPageComponent from "./CreateProjectPageComponent";
import Software from "../../../models/Software";

export default function CreateProjectPageContainer() {

    const [projectName, setProjectName] = useState("");
    const [softwares, setSoftwares] = useState<Software[]>([]);

    return (
        <CreateProjectPageComponent
            projectName={projectName}
            softwares={softwares}
            setProjectName={setProjectName}
            addSoftware={(software) => {
                setSoftwares(softwares.concat(software))
            }}
            removeSoftware={(software) => {
                setSoftwares(softwares.filter((item) => (item !== software)));
            }}/>
    );
}
