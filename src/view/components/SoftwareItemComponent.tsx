import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, Typography} from "@material-ui/core";
import {SoftwareComponent} from "../../repositories/GraphQLSchema";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        justifyContent: 'center'
    },
    avatar: {
        color: 'primary'
    }
}));

interface SoftwareItemProps {
    softwareComponent: SoftwareComponent
}

export default function SoftwareItemComponent(props: SoftwareItemProps) {

    const classes = useStyles();

    return (
        <Paper elevation={3}>
            <Typography className={classes.title} color="textSecondary">
                {props.softwareComponent.name}
            </Typography>
        </Paper>
    );
}

