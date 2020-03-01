import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgress, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";

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
}));

interface NavProps {
    isLoading: Boolean,
    userName?: string
}

function LoginInfo(navProps : NavProps) {

    if(navProps.isLoading) {
        return <CircularProgress color="secondary"/>
    } else if(navProps.userName){
        return <Typography variant="h6">
            "Welcome " + {navProps.userName}
        </Typography>
    } else {
        return <Button color="inherit">Login</Button>
    }
}

export default function NavBar(navProps: NavProps) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Hemdaal
                    </Typography>
                    <div>
                        <LoginInfo isLoading={navProps.isLoading} />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

