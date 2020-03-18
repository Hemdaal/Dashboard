import React from "react";
import NavBarContainer from "./NavBarContainer";
import {useHistory, useParams} from "react-router-dom";
import ProjectSelectionComponent from "../components/ProjectSelectionComponent";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Me, Project} from "../../repositories/GraphQLSchema";
import {CREATE_PROJECT, PROJECT_QUERY} from "../../repositories/ProjectRepository";
import ProjectContainer from "./ProjectContainer";
import LoadingComponent from "../components/LoadingComponent";

const selectedProjectIdKey = "selected_project_id"

export default function DashboardContainer(this: any) {

    const [CreateProjectQuery, {loading: createLoading}] = useMutation<{ me: Me }>(CREATE_PROJECT, {
        onCompleted(data) {
            if (data.me.createProject) {
                history.push("/project/" + data.me.createProject.id)
            }
        }
    });
    const {loading, error, data} = useQuery<{ me: Me }>(PROJECT_QUERY);
    const history = useHistory();
    const {projectId} = useParams()

    let token = localStorage.getItem('token');
    if (token == null || error) {
        console.log(error)
        localStorage.removeItem('token')
        history.push('/login')
    }

    if (projectId) {
        localStorage.setItem(selectedProjectIdKey, projectId)
    } else {
        if (localStorage.getItem(selectedProjectIdKey)) {
            history.push("/project/" + localStorage.getItem(selectedProjectIdKey))
        } else if (data?.me.projects && data?.me.projects.length > 0) {
            history.push("/project/" + projectId)
        }
    }

    let selectedProject = null
    data?.me.projects.forEach((project => {
        if (projectId === project.id.toString()) {
            selectedProject = project
            return
        }
    }))

    const setSelectedProject = (project: Project) => {
        localStorage.setItem(selectedProjectIdKey, project.id.toString())
        history.push("/project/" + project.id.toString())
    }

    if (data && data.me && data.me.projects && projectId) {
        return <div>
            <NavBarContainer/>
            <ProjectSelectionComponent
                loading={loading || createLoading}
                projects={data?.me.projects}
                selectedProject={selectedProject}
                createProject={name => createProject(name, CreateProjectQuery)}
                setSelectedProject={setSelectedProject}
            />
            <ProjectContainer projectId={Number(projectId)}/>
        </div>
    } else {
        return (
            <div>
                <NavBarContainer/>
                <LoadingComponent/>
            </div>
        );
    }
}

function createProject(name: string, createProjectQuery: any) {
    createProjectQuery({variables: {name: name}})
}