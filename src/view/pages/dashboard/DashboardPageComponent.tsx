import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NavBarContainer from "../../shared/navbar/NavBarContainer";
import {Project} from "../../../models/Project";
import {ButtonBase, Card, Grid, Paper} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import LoadingComponent from "../../shared/LoadingComponent";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

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

interface DashboardPageProps {
    projects: Project[]
    loading: boolean
    onCreateProject: () => void
}


export default function DashboardPageComponent(props: DashboardPageProps) {

    const classes = useStyles();

    return (
        <div>
            <NavBarContainer/>
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                {getLoadingComponent(props.loading)}
                <Grid container spacing={3}>
                    {getAddProjectComponent(props.onCreateProject, classes)}
                    {getProjectComponents(props.projects, classes)}
                </Grid>
            </Container>
        </div>
    );
}

function getAddProjectComponent(onCreateProject: () => void, classes: any) {
    return (
        <Grid item xs={3}>
            <Card className={classes.card}>
                <ButtonBase
                    className={classes.cardAction}
                    onClick={event => {
                        onCreateProject()
                    }}>
                    <div>
                        <AddIcon/><br/>
                        Add Project
                    </div>
                </ButtonBase>
            </Card>
        </Grid>
    );
}

function getProjectComponents(projects: Project[], classes: any) {
    const items: any = [];

    projects.map(((value, index) => {
        items.push(getProjectComponent(value, classes))
    }));

    return <div>
        {items}
    </div>;
}

function getProjectComponent(project: Project, classes: any) {
    return (
        <Grid item xs={3}>
            <Paper className={classes.paper}>{project.name}</Paper>
        </Grid>
    );
}

function getLoadingComponent(loading: boolean) {
    if (loading) {
        return <LoadingComponent/>
    } else {
        return <div/>
    }
}
