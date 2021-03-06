import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar, Badge, CircularProgress, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {User} from "../../../models/User";

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

interface NavProps {
    isLoading: Boolean,
    user: User | null,
    onLogout: (() => void),
    onLogin: (() => void)
}

export default function NavBarComponent(navProps: NavProps) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Hemdaal
                    </Typography>
                    <div>
                        <LoginInfo isLoading={navProps.isLoading} user={navProps.user}
                                   onLogin={navProps.onLogin} onLogout={navProps.onLogout}/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}


function LoginInfo(navProps: NavProps) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (navProps.isLoading) {
        return <div><CircularProgress color="secondary"/></div>
    } else if (navProps.user) {
        return <div>
            <IconButton onClick={handleClick}>
                <Badge color={"primary"}>
                    <Avatar>{navProps.user.name?.substring(0, 1).toLocaleUpperCase()}</Avatar>
                </Badge>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={navProps.onLogout}>Logout</MenuItem>
            </Menu>
        </div>
    } else {
        return <Button color="inherit" onClick={navProps.onLogin}>Login</Button>
    }
}


