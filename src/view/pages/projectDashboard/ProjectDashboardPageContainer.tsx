import React, {useState} from "react";
import ProjectDashboardPageComponent from "./ProjectDashboardPageComponent";
import {System} from "../../../models/System";
import {useHistory} from "react-router";
import {useParams} from 'react-router-dom'
import {ProjectDashboard} from "../../../models/ProjectDashboard";
import WidgetTypeDialogComponent from "../../shared/WidgetTypeDialogComponent";
import {WidgetType} from "../../../models/widgets/WidgetType";


export default function ProjectDashboardPageContainer() {

    const {projectId} = useParams();
    const {error, loading, projectDashboard, loginFailed, addWidget} = useProjectDashboard(Number(projectId));
    const [open, setOpen] = useState(false);

    const history = useHistory();

    if (loginFailed) {
        history.push("/login")
    }

    return (
        <div>
            <ProjectDashboardPageComponent
                loading={loading}
                projectDashboard={projectDashboard}
                onCreateWidget={() => {
                    setOpen(true)
                }}
            />
            <WidgetTypeDialogComponent open={open} onClose={value => {
                setOpen(false);
                if (value) {
                    addWidget(value)
                }
            }}/>
        </div>
    );
}

function useProjectDashboard(projectId: number) {
    const [initialized, setInitialized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const [projectDashboard, setProjectDashboard] = useState<ProjectDashboard | null>(null);
    const system = System.getInstance();

    if (!initialized) {
        setInitialized(true);
        system.getAccess().then(user => {
            user.getProject(projectId).then(project => {
                project.syncMetrics().then(r => {
                });
                project.getProjectDashboard().then(projectDashboard => {
                    setLoading(false);
                    setProjectDashboard(projectDashboard);
                });
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

    function addWidget(widgetType: WidgetType) {
        system.getAccess().then(user => {
            user.getProject(projectId).then(project => {
                project.getProjectDashboard().then(projectDashboard => {
                    projectDashboard.addWidget(widgetType).then(widget => {
                        setLoading(false);
                        setProjectDashboard(projectDashboard)
                    });
                });
            })
        }).catch(error => {
            setLoading(false);
            setError(error);
        })
    }

    return {error, loading, projectDashboard, loginFailed, addWidget};
}
