import React, {useState} from "react";
import NavBarContainer from "./NavBarContainer";
import {useHistory} from "react-router-dom";
import DashBoardComponent from "../components/DashBoardComponent";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Me, Project} from "../../repositories/GraphQLSchema";
import {CREATE_PROJECT, PROJECT_QUERY} from "../../repositories/ProjectRepository";

export default function DashBoardContainer() {

    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [CreateProjectQuery, {loading: createLoading, error: createError, data: createData}] = useMutation<{ me: Me }>(CREATE_PROJECT);
    const {loading, error, data} = useQuery<{ me: Me }>(PROJECT_QUERY);
    const history = useHistory();

    let token = localStorage.getItem('token');
    if (token == null || error) {
        console.log(error)
        localStorage.removeItem('token')
        history.push('/login')
    }

    if(createData && createData.me.createProject && createData.me.createProject.id != selectedProject?.id) {
        localStorage.setItem("selected_project_id", createData.me.createProject.id.toString())
        setSelectedProject(createData.me.createProject)
    }

    if (!selectedProject) {

        if (data?.me.projects != null) {
            const selectedProjectId = localStorage.getItem("selected_project_id")
            data.me.projects.forEach((project => {
                if (!selectedProjectId) {
                    setSelectedProject(project)
                    return
                } else if (selectedProjectId == project.id.toString()) {
                    setSelectedProject(project)
                    return
                }
            }))
        }
    }

    return (
        <div>
            <div>
                <NavBarContainer/>
            </div>
            <div>
                <DashBoardComponent
                    loading={loading || createLoading}
                    projects={data?.me.projects}
                    selectedProject={selectedProject}
                    createProject={name => createProject(name, CreateProjectQuery)}
                    setSelectedProject={setSelectedProject}
                />
            </div>
        </div>

    );
}

function createProject(name: string, createProjectQuery : any) {
    createProjectQuery({variables: {name: name}})
}