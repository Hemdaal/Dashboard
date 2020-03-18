import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Select} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

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
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

interface AddSoftwareProps {
    name: string
    metricType: string
    collectorType: string
    resourceUrl: string
    token: string
    onNameChange: ((email: string) => void)
    onMetricTypeChange: ((metricType: string) => void)
    onCollectorTypeChange: ((collectorType: string) => void)
    onTokenChange: ((token: string) => void)
    validate: (() => boolean)
    onAddClicked: (() => void)
    isLoading: boolean
    onResourceUrlChange: ((url: string) => void)
}

export default function AddSoftwareComponent(props: AddSoftwareProps) {

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Software Name"
                name="name"
                value={props.name}
                onChange={e => props.onNameChange(e.target.value)}
                autoComplete="email"
                autoFocus
            />
            <Select
                native
                value={props.metricType}
                onChange={e => props.onMetricTypeChange(e.target.value as string)}
                inputProps={{
                    name: 'metric-type',
                    id: 'metric-type',
                }}
            >
                <option value={"REPO"}>GIT Repository</option>
            </Select>
            <Select
                native
                value={props.collectorType}
                onChange={e => {
                    props.onCollectorTypeChange(e.target.value as string)
                }}
                inputProps={{
                    name: 'collector-type',
                    id: 'collector-type',
                }}
            >
                <option value={"GITHUB_REPO"}>GITHUB</option>
            </Select>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="resource-url"
                value={props.resourceUrl}
                label="Repo URL"
                type="url"
                id="url"
                onChange={e => props.onResourceUrlChange(e.target.value)}
                autoComplete="url"
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="token"
                value={props.token}
                label="token"
                type="token"
                id="token"
                onChange={e => props.onTokenChange(e.target.value)}
                autoComplete="github-token"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!props.validate() || props.isLoading}
                className={classes.submit}
                onClick={() => {
                    props.onAddClicked()
                }}
            >
                Add Software
            </Button>
        </Container>
    );
}

