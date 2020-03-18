import React from 'react';
import {Project} from "../../repositories/GraphQLSchema";
import {Button, CircularProgress, Menu, MenuItem, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    menuButton: {
        margin: theme.spacing(2),
        variant: "outlined",
    },
    title: {
        flexGrow: 1,
    },
}));

export interface DashboardProps {
    loading: boolean
    projects?: Project[]
    selectedProject?: Project | null
    setSelectedProject: ((project: Project) => void)
    createProject: ((projectName: string) => void)
}

export default function ProjectSelectionComponent(props: DashboardProps) {

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
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <CircularProgress/>
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

    if (props.projects) {
        const menus = props.projects.map((project) => {
            return <MenuItem onClick={event => {
                handleClose()
                props.setSelectedProject(project)
            }} selected={project.id === props.selectedProject?.id}>{project.name}</MenuItem>
        });

        const projectSelectionButton = () => {
            if (props.selectedProject) {
                return (<Button className={classes.menuButton} variant="outlined" color="primary" onClick={handleClick}>
                    {props.selectedProject?.name} &#8964;
                </Button>)
            } else {
                return (<Button className={classes.menuButton} variant="outlined" color="primary" onClick={handleClick}>
                    Select Project &#8964;
                </Button>)
            }
        }

        return (
            <div>
                <div>
                    {projectSelectionButton()}
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        {menus}
                        <MenuItem onClick={event => {
                            handleClose()
                            handleDialogClickOpen()
                        }
                        }>Add Project</MenuItem>
                        {ProjectDialog(open, handleClose, createProjectName, setCreateProjectName, handleDialogClose, handleDialogCreateClose)}
                    </Menu>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <Button className={classes.menuButton} variant="contained" color="primary"
                            onClick={handleDialogClickOpen}>
                        Create Project
                    </Button>
                    {ProjectDialog(open, handleClose, createProjectName, setCreateProjectName, handleDialogClose, handleDialogCreateClose)}
                </div>
            </div>
        );
    }
}

function ProjectDialog(open: any, handleClose: any, createProjectName: any, setCreateProjectName: any, handleDialogClose: any, handleDialogCreateClose: any) {
    return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
}