import React from 'react';
import {Project} from "../../repositories/GraphQLSchema";
import {Button, Menu, MenuItem, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
    menuButton: {
        margin: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
    },
}));

export interface DashboardProps {
    loading: boolean
    projects?: Project[]
    selectedProject?: Project | null
    createProject : ((projectName:string) => void)
}

export default function DashBoardComponent(props: DashboardProps) {

    const classes = useStyles();

    const [createProjectName, setCreateProjectName] = React.useState<string>("");
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (props.loading) {
        return <div>
            <progress/>
        </div>
    }

    const handleDialogClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleDialogCreateClose = () => {
        setOpen(false);
        props.createProject(createProjectName)
    };

    if (props.projects && props.selectedProject) {
        const menus = props.projects.map((project) => {
            return <MenuItem selected={project.id === props.selectedProject?.id}>{project.name}</MenuItem>
        });

        return (
            <div>
                <div>
                    <Button className={classes.menuButton} aria-controls="simple-menu" aria-haspopup="true"
                            onClick={handleClick}>
                        {props.selectedProject?.name} &#8964;
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        {menus}
                        <MenuItem>Add Project</MenuItem>
                    </Menu>
                </div>

            </div>
        );
    } else {
        return (
            <div>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                    <Button className={classes.menuButton} variant="contained" color="primary" onClick={handleDialogClickOpen}>
                        Create Project
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Create your project by giving your project name.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Project Name"
                                type="name"
                                onChange={e => setCreateProjectName(e.target.value)}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose} color="primary">
                                Cancel
                            </Button>
                            <Button disabled={createProjectName.length < 4} onClick={handleDialogCreateClose} color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

function openCreateProjectDialog() {

}

