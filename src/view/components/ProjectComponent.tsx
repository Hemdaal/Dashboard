import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Project} from "../../repositories/GraphQLSchema";
import SoftwareItemComponent from "./SoftwareItemComponent";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    avatar: {
        color: 'primary'
    }
}));

interface ProjectProps {
    project: Project,
    onAddSoftwareClick: (() => void)
}

export default function ProjectComponent(props: ProjectProps) {

    const classes = useStyles();

    const createSoftware = (
        <Card className={classes.root}>
            <CardActions>
                <Button size="large" onClick={() => {
                    props.onAddSoftwareClick()
                }}>Add Software Component</Button>
            </CardActions>
        </Card>
    );


    if (props.project && props.project.softwareComponents) {

        const softwareItems = props.project.softwareComponents.map((softwareComponent) => {
            return <SoftwareItemComponent softwareComponent={softwareComponent}/>
        });

        return (
            <div className={classes.root}>
                {softwareItems}
                {createSoftware}
            </div>
        );
    } else {
        return (
            <div>
                {createSoftware}
            </div>
        );
    }
}

