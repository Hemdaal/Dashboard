import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Avatar,
    Badge,
    Card, CardContent,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import {Project, SoftwareComponent} from "../../repositories/GraphQLSchema";

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

interface SoftwareItemProps {
    softwareComponent : SoftwareComponent
}

export default function SoftwareItemComponent(props: SoftwareItemProps) {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary">
                    {props.softwareComponent.name}
                </Typography>
            </CardContent>
        </Card>
    );
}

