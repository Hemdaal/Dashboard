import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NavBarContainer from "../../shared/navbar/NavBarContainer";
import LoadingComponent from "../../shared/LoadingComponent";
import {ProjectDashboard} from "../../../models/ProjectDashboard";
import GridLayout from 'react-grid-layout';
import {ProjectWidget} from "../../../models/widgets/ProjectWidget";
import {WidgetType} from "../../../models/widgets/WidgetType";
import CommitWidgetContainer from "../../shared/widgets/CommitWidgetContainer";
import {CommitWidget} from "../../../models/widgets/CommitWidget";
import {ButtonBase, Card} from "@material-ui/core";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";

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
    onCreateWidget: () => void
}

export default function ProjectDashboardPageComponent(props: ProjectDashboardPageProps) {

    const classes = useStyles();

    return (
        <div>
            <NavBarContainer/>
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                {getLoadingComponent(props.loading)}
                {getWidgetsComponent(classes, props.projectDashboard, props.onCreateWidget)}
            </Container>
        </div>
    );
}

function getWidgetsComponent(classes: any, projectDashboard: ProjectDashboard | null, onCreateWidget: () => void) {
    if (projectDashboard) {
        return (getWidgets(classes, projectDashboard.widgets, onCreateWidget))
    } else {
        return (
            <div/>
        )
    }
}

function getWidgets(classes: any, widgets: ProjectWidget[], onCreateWidget: () => void) {
    const items: any = [];

    widgets.map(((value, index) => {
        items.push(getWidgetComponent(value, index))
    }));
    items.push(getAddWidgetComponent(classes, widgets.length, onCreateWidget));


    return <GridLayout className="layout">{items}</GridLayout>
}

function getWidgetComponent(widget: ProjectWidget, index: number) {
    if (widget.type == WidgetType.COMMIT) {
        return <CommitWidgetContainer key={index} commitWidget={widget as CommitWidget}/>
    }
}

function getAddWidgetComponent(classes: any, index: number, onCreateWidget: () => void) {


    return <div key={index}>
        <Card className={classes.card}>
            <ButtonBase
                className={classes.cardAction}
                onClick={event => {
                    onCreateWidget()
                }}>
                <div>
                    <AddIcon/><br/>
                    Add Widget
                </div>
            </ButtonBase>
        </Card>
    </div>
}


function getLoadingComponent(loading: boolean) {
    if (loading) {
        return <LoadingComponent/>
    } else {
        return <div/>
    }
}
