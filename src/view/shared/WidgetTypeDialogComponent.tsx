import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {WidgetType} from "../../models/widgets/WidgetType";


export interface WidgetTypeDialogComponentProps {
    open: boolean;
    onClose: () => void;
    onClick: (value: WidgetType) => void;
}

export default function WidgetTypeDialogComponent(props: WidgetTypeDialogComponentProps) {

    return <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <List>
            {getListItems(props.onClick)}
        </List>
    </Dialog>;
}

function getListItems(onClick: (value: WidgetType) => void) {
    let items: any = [];
    Object.values(WidgetType).forEach(value => {
        items.push(<ListItem button onClick={() => onClick(value as WidgetType)} key={value}>
            <ListItemText primary={value}/>
        </ListItem>)
    });

    return <List>{items}</List>
}
