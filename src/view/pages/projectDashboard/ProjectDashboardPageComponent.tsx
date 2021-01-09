import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NavBarContainer from "../../shared/navbar/NavBarContainer";
import LoadingComponent from "../../shared/LoadingComponent";
import {ProjectDashboard} from "../../../models/ProjectDashboard";
import GridLayout from 'react-grid-layout';

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
        return (
            <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
                <div key="a" data-grid={{x: 0, y: 0, w: 1, h: 2, static: true}}>a</div>
                <div key="b" data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>b</div>
                <div key="c" data-grid={{x: 4, y: 0, w: 1, h: 2}}>c</div>
            </GridLayout>
        )
    } else {
        return (
            <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
                <div key="a">a</div>
                <div key="b">b</div>
                <div key="c">c</div>
            </GridLayout>
        )
    }
}

function getLoadingComponent(loading: boolean) {
    if (loading) {
        return <LoadingComponent/>
    } else {
        return <div/>
    }
}
