import React, {useState} from "react";
import NavBarContainer from "../../shared/NavBarContainer";
import CreateProjectComponent from "./CreateProjectComponent";
import Software from "../../../models/Software";

export default function CreateProjectContainer() {

    const [projectName, setProjectName] = useState("");
    const [softwares, setSoftwares] = useState<Software[]>([]);

    return (
        <div>
            <NavBarContainer/>
            <CreateProjectComponent
                projectName={projectName}
                softwares={softwares}
                setProjectName={setProjectName}
                addSoftware={(software) => {
                    setSoftwares(softwares.concat(software))
                }}
                removeSoftware={(software) => {
                    setSoftwares(softwares.filter((item) => (item !== software)));
                }}/>
        </div>
    );
}
