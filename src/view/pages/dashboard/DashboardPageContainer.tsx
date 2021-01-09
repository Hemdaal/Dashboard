import React, {useEffect, useState} from "react";
import DashboardPageComponent from "./DashboardPageComponent";
import {System} from "../../../models/System";
import {Project} from "../../../models/Project";
import {useHistory} from "react-router";

export default function DashboardPageContainer() {

    const {error, loading, projects, loginFailed} = useDashboard();
    const history = useHistory();

    if (loginFailed) {
        history.push("/login");
        return <div/>
    }

    return (
        <DashboardPageComponent
            loading={loading}
            projects={projects}
            onCreateProject={() => history.push('/createProject')}
            onProjectSelected={(projectId => history.push(`/project/${projectId}/dashboard`))}
        />
    );
}

function useDashboard() {
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const system = System.getInstance();

    if (!initialized) {
        setInitialized(true);
        system.getAccess().then(user => {
            user.getProjects().then(projects => {
                setLoading(false);
                setProjects(projects);
            }).catch(error => {
                setLoading(false);
                setError(error);
            })
        }).catch(error => {
            setLoginFailed(true);
            setLoading(false);
            setError(error);
        })
    }

    return {error, loading, projects, loginFailed};
}
