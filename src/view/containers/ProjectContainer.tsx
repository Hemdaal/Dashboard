import React from "react";
import {useHistory} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {Me} from "../../repositories/GraphQLSchema";
import {PROJECT_DETAIL_QUERY} from "../../repositories/ProjectRepository";
import ProjectComponent from "../components/ProjectComponent";
import LoadingComponent from "../components/LoadingComponent";

interface ProjectProps {
    projectId: number
}

export default function ProjectContainer(props: ProjectProps) {

    const history = useHistory();

    const {loading, error, data} = useQuery<{ me: Me }>(PROJECT_DETAIL_QUERY, {
        variables: {projectId: props.projectId}
    });

    if (data && data.me && data.me.projects) {
        return <ProjectComponent
            project={data?.me.project}
            onAddSoftwareClick={() => {
                history.push('/addSoftware/' + data?.me.project.id)
            }}/>
    } else if (loading) {
        return (
            <LoadingComponent/>
        );
    } else {
        return <div/>
    }
}