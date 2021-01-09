import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NavBarContainer from "../../shared/navbar/NavBarContainer";
import LoadingComponent from "../../shared/LoadingComponent";
import {ProjectDashboard} from "../../../models/ProjectDashboard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        card: {
            padding: theme.spacing(8, 2, 8),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        cardAction: {
            textAlign: 'center'
        }
    }),
);

interface ProjectDashboardPageProps {
    projectDashboard: ProjectDashboard | null
    loading: boolean
    onCreateProject: () => void
}

export default function ProjectDashboardPageComponent(props: ProjectDashboardPageProps) {

    const classes = useStyles();

    return (
        <div>
            <NavBarContainer/>
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                {getLoadingComponent(props.loading)}
                {getWidgetsComponent(props.projectDashboard)}
            </Container>
        </div>
    );
}

function getWidgetsComponent(projectDashboard: ProjectDashboard | null) {
    if (projectDashboard) {
        return <div/>
    } else {
        return <div/>
    }
}

function getLoadingComponent(loading: boolean) {
    if (loading) {
        return <LoadingComponent/>
    } else {
        return <div/>
    }
}
