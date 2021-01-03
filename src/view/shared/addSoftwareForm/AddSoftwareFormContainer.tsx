import React, {useState} from "react";
import AddSoftwareFormComponent from "./AddSoftwareFormComponent";
import {Box} from "@material-ui/core";
import {SoftwareCreateInfo} from "../../../models/ProjectCreateInfo";

interface AddSoftwareProps {
    software: SoftwareCreateInfo
    onSoftwareChange: ((software: SoftwareCreateInfo) => void)
    onSoftwareRemove: ((software: SoftwareCreateInfo) => void)
}

export default function AddSoftwareFormContainer(props: AddSoftwareProps) {

    const [repoType, setRepoType] = useState("");
    const [repoUrl, setRepoUrl] = useState("");
    const [repoToken, setRepoToken] = useState("");

    return (
        <Box borderColor="grey.500">
            <AddSoftwareFormComponent
                software={props.software}
                onSoftwareRemove={() => {
                    props.onSoftwareRemove(props.software)
                }}/>
        </Box>
    );
}
