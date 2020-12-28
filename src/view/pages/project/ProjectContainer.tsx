import React from "react";
import {useHistory} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {Me} from "../../../repositories/GraphQLSchema";
import {PROJECT_DETAIL_QUERY} from "../../../repositories/ProjectRepository";
import ProjectComponent from "./ProjectComponent";
import LoadingComponent from "../../shared/LoadingComponent";
import ErrorComponent from "../../shared/ErrorComponent";

interface ProjectProps {
    projectId: number
}

export default function ProjectContainer(props: ProjectProps) {

    const history = useHistory();

    const {loading, error, data} = useQuery<{ me: Me }>(PROJECT_DETAIL_QUERY, {
        variables: {projectId: props.projectId}
    });

    if (loading) {
        return (
            <LoadingComponent/>
        );
    } else if (data && data.me && data.me.project) {
        return <ProjectComponent
            project={data?.me.project}
            onAddSoftwareClick={() => {
                history.push('/project/' + data?.me.project.id + "/addSoftware")
            }}/>
    } else {
        return <ErrorComponent/>
    }
}
