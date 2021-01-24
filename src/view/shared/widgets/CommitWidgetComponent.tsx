import React from "react";
import {ButtonBase, Card, createStyles, makeStyles, Theme} from "@material-ui/core";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        card: {
            padding: theme.spacing(8, 2, 8),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        cardAction: {
            textAlign: 'center'
        }
    }),
);

export default function CommitWidgetComponent() {

    const classes = useStyles();

    return <div>
        <Card className={classes.card}>
            <div>
                Commit Widget
            </div>
        </Card>
    </div>
}
