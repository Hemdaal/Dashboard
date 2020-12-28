import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Paper, Typography} from "@material-ui/core";
import {Project} from "../../../repositories/GraphQLSchema";
import SoftwareItemComponent from "../../shared/softwareItem/SoftwareItemComponent";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(16),
                height: theme.spacing(16),
            },
        },
        title: {
            justifyContent: 'center'
        },
    }),
);
interface ProjectProps {
    project: Project,
    onAddSoftwareClick: (() => void)
}

export default function ProjectComponent(props: ProjectProps) {

    const classes = useStyles();

    const createSoftware = (
        <Paper elevation={3} className={classes.title} color="textSecondary" onClick={() => {
            props.onAddSoftwareClick()
        }}>
            Add Software Component
        </Paper>
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

