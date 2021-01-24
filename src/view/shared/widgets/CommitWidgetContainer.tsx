import React from "react";
import CommitWidgetComponent from "./CommitWidgetComponent";
import {CommitWidget} from "../../../models/widgets/CommitWidget";

interface Props {
    commitWidget: CommitWidget
}

export default function CommitWidgetContainer(props: Props) {


    return (<CommitWidgetComponent/>)
}
