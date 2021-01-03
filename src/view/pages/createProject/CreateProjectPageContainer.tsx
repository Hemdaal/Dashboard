import React, {useState} from "react";
import CreateProjectPageComponent from "./CreateProjectPageComponent";
import {System} from "../../../models/System";
import {SoftwareCreateInfo} from "../../../models/ProjectCreateInfo";
import {useHistory} from "react-router";

export default function CreateProjectPageContainer() {

    const [name, setName] = useState('');
    const [softwares, setSoftwares] = useState<SoftwareCreateInfo[]>([]);
    const {error, loading, projectCreatedId, createProject} = useCreateProject();
    const history = useHistory();

    function addSoftware(software: SoftwareCreateInfo) {
        const addedSoftwares = softwares.concat(software);
        setSoftwares(addedSoftwares);
    }

    function removeSoftware(software: SoftwareCreateInfo) {
        const removedSoftwares = softwares.filter((item) => (item !== software));
        setSoftwares(removedSoftwares);
    }

    function setSoftware(index: number, software: SoftwareCreateInfo) {
        const softwareToBeChanged = softwares.map(software => software);
        softwareToBeChanged[index] = software;
        setSoftwares(softwareToBeChanged);
    }

    if (projectCreatedId) {
        history.push(`/project/${projectCreatedId}`)
    }

    return (
        <CreateProjectPageComponent
            projectName={name}
            softwares={softwares}
            error={error}
            loading={loading}
            setProjectName={setName}
            addSoftware={software => addSoftware(software)}
            removeSoftware={software => removeSoftware(software)}
            setSoftware={(index, software) => setSoftware(index, software)}
            createProject={() => {
                createProject(name, softwares)
            }}
        />
    );
}

function useCreateProject() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [projectCreatedId, setProjectCreatedId] = useState<number | null>(null);
    const system = System.getInstance();

    function createProject(name: string, softwares: SoftwareCreateInfo[]) {
        system.getAccess().then(user => {
            user.createProject(name).then(createdProject => {
                softwares.forEach((softwareCreateInfo, index) => {
                    createdProject.addSoftWare(softwareCreateInfo.name).then(addedSoftware => {
                        addedSoftware.setCodeManagement(softwareCreateInfo.codeManagement).then(codeManagement => {
                            //Checking for last operation.
                            if (index === softwares.length - 1) {
                                setProjectCreatedId(createdProject.id);
                            }
                        }).catch(error => setError(error))
                    })
                })
            })
        }).catch(error => {
            setLoading(false);
            setError(error);
        })
    }

    return {error, loading, projectCreatedId, createProject};
}
