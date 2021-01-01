import React, {useState} from "react";
import NavBarContainer from "../../shared/NavBarContainer";
import AddSoftwareFormComponent from "./AddSoftwareFormComponent";
import {Box} from "@material-ui/core";
import Software from "../../../models/Software";

interface AddSoftwareProps {
    software: Software
    onSoftwareChange: ((software: Software) => void)
    onSoftwareRemove: ((software: Software) => void)
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
