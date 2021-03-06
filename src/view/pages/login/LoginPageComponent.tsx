import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NavBarContainer from "../../shared/navbar/NavBarContainer";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface LoginProps {
    email: string
    password: string
    rememberMe: boolean
    loading: boolean
    error: string
    onRememberMe: ((rememberMe: boolean) => void)
    onLoginClick: (() => void)
    onEmailChange: ((email: string) => void)
    onPasswordChange: ((password: string) => void)
    onSignupClick: (() => void)
    validate: (() => boolean)
}

export default function LoginPageComponent(props: LoginProps) {
    const classes = useStyles();

    return (
        <div>
            <NavBarContainer/>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={e => {
                        e.preventDefault();
                        props.onLoginClick()
                    }
                    }>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={props.email}
                            onChange={e => props.onEmailChange(e.target.value)}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={props.password}
                            label="Password"
                            type="password"
                            id="password"
                            onChange={e => props.onPasswordChange(e.target.value)}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox
                                value="remember"
                                color="primary"
                                checked={props.rememberMe}
                                onChange={e => props.onRememberMe(e.target.checked)}
                            />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!props.validate() || props.loading}
                            className={classes.submit}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={props.onSignupClick}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );
}
