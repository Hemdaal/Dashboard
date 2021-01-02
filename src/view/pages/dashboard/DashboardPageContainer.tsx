import React, {useEffect, useState} from "react";
import DashboardPageComponent from "./DashboardPageComponent";
import {System} from "../../../models/System";
import {Project} from "../../../models/Project";
import {useHistory} from "react-router";

export default function DashboardPageContainer() {

    const {error, loading, projects} = useDashboard();
    const history = useHistory();

    return (
        <DashboardPageComponent
            loading={loading}
            projects={projects}
            onCreateProject={() => history.push('/createProject')}
        />
    );
}

function useDashboard() {
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
            setLoading(false);
            setError(error);
        })
    }

    return {error, loading, projects};
}
