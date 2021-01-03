import React, {useState} from "react";
import CreateProjectPageComponent from "./CreateProjectPageComponent";
import {System} from "../../../models/System";
import {ProjectCreateInfo, SoftwareCreateInfo} from "../../../models/ProjectCreateInfo";
import {useHistory} from "react-router";

export default function CreateProjectPageContainer() {

    const [projectCreationInfo, setProjectCreationInfo] = useState(new ProjectCreateInfo());
    const {error, loading, projectCreatedId, createProject} = useCreateProject();
    const history = useHistory();

    function setProjectName(name: string) {
        projectCreationInfo.name = name;
        setProjectCreationInfo(projectCreationInfo);
    }

    function setSoftware(software: SoftwareCreateInfo) {
        projectCreationInfo.softwares.concat(software);
        setProjectCreationInfo(projectCreationInfo);
    }

    function removeSoftware(software: SoftwareCreateInfo) {
        projectCreationInfo.softwares = projectCreationInfo.softwares.filter((item) => (item !== software));
        setProjectCreationInfo(projectCreationInfo);
    }

    if(projectCreatedId) {
        history.push(`/project/${projectCreatedId}`)
    }

    return (
        <CreateProjectPageComponent
            projectName={projectCreationInfo.name}
            softwares={projectCreationInfo.softwares}
            error={error}
            loading={loading}
            setProjectName={setProjectName}
            addSoftware={software => setSoftware(software)}
            removeSoftware={software => removeSoftware(software)}
            createProject={() => {
                createProject(projectCreationInfo)
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
                        addedSoftware.setCodeManagement(softwareCreateInfo.codeManagement).then(codeManagement => {
                            //Checking for last operation.
                            if (index == projectCreateInfo.softwares.length - 1) {
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
