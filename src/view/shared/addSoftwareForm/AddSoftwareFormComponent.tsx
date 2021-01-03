import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {SoftwareCreateInfo} from "../../../models/ProjectCreateInfo";

const useStyles = makeStyles(theme => ({
    box: {
        margin: theme.spacing(1, 0, 1),
        border: '1px solid grey'
    },
    form: {
        margin: theme.spacing(3, 2, 2),
    },
    remove: {
        display: 'flex',
        alignItems: 'flexEnd'
    }
}));


interface AddSoftwareProps {
    software: SoftwareCreateInfo
    onSoftwareRemove: (() => void)
}

export default function AddSoftwareFormComponent(props: AddSoftwareProps) {

    const classes = useStyles();

    return (
        <Box border="1" borderColor="primary.main" className={classes.box}>
            <div className={classes.form}>
                <Button color="secondary" className={classes.remove} onClick={props.onSoftwareRemove}>
                    Remove
                </Button>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Software Name"
                    name="name"
                    autoComplete="email"
                    autoFocus
                />
                <FormControl component="fieldset">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox name="Code Metrics"/>}
                            label="Code Metrics"
                        />
                        {getCodeMetricsForm(classes)}
                        <FormControlLabel
                            control={<Checkbox name="Build Metrics"/>}
                            label="Build Metrics"
                        />
                        <FormControlLabel
                            control={<Checkbox name="Deploy Metrics"/>}
                            label="Deploy Metrics"
                        />
                    </FormGroup>
                </FormControl>
            </div>
        </Box>
    );
}

function getCodeMetricsForm(styles: any) {

    return <div className={styles.box}>
        <FormControl variant="outlined" className={styles.form}>
            <InputLabel id="demo-simple-select-outlined-label">Select</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Age"
            >
                <MenuItem value={10}>GITHUB</MenuItem>
                <MenuItem value={20}>GITLAB</MenuItem>
            </Select>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Repo url"
                name="name"
                autoComplete="url"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Token"
                name="name"
                autoFocus
            />
        </FormControl>
    </div>;
}

