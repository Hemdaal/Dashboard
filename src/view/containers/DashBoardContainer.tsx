import React, {useState} from "react";
import NavBarContainer from "./NavBarContainer";
import {useHistory} from "react-router-dom";
import DashBoardComponent from "../components/DashBoardComponent";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Me, Project} from "../../repositories/GraphQLSchema";
import {CREATE_PROJECT, PROJECT_QUERY} from "../../repositories/ProjectRepository";

export default function DashBoardContainer() {

    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [CreateProjectQuery, {loading: createLoading}] = useMutation<{ me: Me }>(CREATE_PROJECT, {
        onCompleted(data) {
            if (data.me.createProject) {
                setSelectedProject(data.me.createProject)
            }
        }
    });
    const {loading, error, data} = useQuery<{ me: Me }>(PROJECT_QUERY);
    const history = useHistory();

    let token = localStorage.getItem('token');
    if (token == null || error) {
        console.log(error)
        localStorage.removeItem('token')
        history.push('/login')
    }

    if(selectedProject) {
        localStorage.setItem("selected_project_id", selectedProject.id.toString())
    }

    if (selectedProject == null && data?.me.projects && data?.me.projects.length > 0) {
        const selectedProjectId = localStorage.getItem("selected_project_id")
        let isExist = false
        data.me.projects.forEach((project => {
            if (selectedProjectId == project.id.toString()) {
                setSelectedProject(project)
                isExist = true
                return
            }
        }))

        if(!isExist) {
            setSelectedProject(data.me.projects[0])
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

function createProject(name: string, createProjectQuery: any) {
    createProjectQuery({variables: {name: name}})
}