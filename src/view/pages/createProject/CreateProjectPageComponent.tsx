import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Icon, Select} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import AddSoftwareFormContainer from "../../shared/addSoftwareForm/AddSoftwareFormContainer";
import Software from "../../../models/Software";
import NavBarContainer from "../../shared/NavBarContainer";

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

interface CreateProjectProps {
    projectName: string
    softwares: Software[]
    setProjectName: ((projectName: string) => void)
    addSoftware: ((software: Software) => void)
    removeSoftware: ((software: Software) => void)
}

function onSoftwareChange(software: Software) {

}


export default function CreateProjectPageComponent(props: CreateProjectProps) {

    const classes = useStyles();

    return (
        <div>
            <NavBarContainer/>
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Project Name"
                    name="name"
                    autoComplete="email"
                    autoFocus
                />
                {getSoftwareFormList(props.softwares, props.removeSoftware)}
                <Button
                    color="primary"
                    onClick={() => {
                        props.addSoftware(new Software(0, ''))
                    }}>
                    Add Software
                </Button>


                <div>
                    <Button variant="contained" color="primary">
                        Create
                    </Button>
                </div>
            </Container>
        </div>
    );
}

function getSoftwareFormList(softwares: Software[], removeSoftware: ((software: Software) => void)) {

    const items: any = [];

    softwares.map(((value, index) => {
        items.push(<AddSoftwareFormContainer
            key={index}
            software={value}
            onSoftwareChange={onSoftwareChange}
            onSoftwareRemove={(i) => {
                removeSoftware(value)
            }}
        />)

    }));


    return <div>
        {items}
    </div>;
}

