import React, {useState} from "react";
import CreateProjectPageComponent from "./CreateProjectPageComponent";
import {System} from "../../../models/System";
import {ProjectCreateInfo, SoftwareCreateInfo} from "../../../models/ProjectCreateInfo";
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

    function isValid(): boolean {
        const projectCreateInfo = new ProjectCreateInfo();
        projectCreateInfo.name = name;
        projectCreateInfo.softwares = softwares;
        return projectCreateInfo.isValidData();
    }


    if (projectCreatedId) {
        history.push(`/project/${projectCreatedId}/dashboard`)
    }

    return (
        <CreateProjectPageComponent
            projectName={name}
            softwares={softwares}
            isValid={isValid()}
            error={error}
            loading={loading}
            setProjectName={setName}
            addSoftware={software => addSoftware(software)}
            removeSoftware={software => removeSoftware(software)}
            setSoftware={(index, software) => setSoftware(index, software)}
            createProject={() => {
                const projectCreateInfo = new ProjectCreateInfo();
                projectCreateInfo.name = name;
                projectCreateInfo.softwares = softwares;
                createProject(projectCreateInfo)
            }}
        />
    );
}

function useCreateProject() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [projectCreatedId, setProjectCreatedId] = useState<number | null>(null);
    const system = System.getInstance();

    function createProject(projectCreateInfo: ProjectCreateInfo) {
        system.getAccess().then(user => {
            user.createProject(projectCreateInfo.name).then(createdProject => {
                projectCreateInfo.softwares.forEach((softwareCreateInfo, index) => {
                    createdProject.addSoftWare(softwareCreateInfo.name).then(addedSoftware => {
                        addedSoftware.setCodeManagement(createdProject.id, softwareCreateInfo.codeManagement).then(codeManagement => {
                            //Checking for last operation.
                            if (index === projectCreateInfo.softwares.length - 1) {
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
