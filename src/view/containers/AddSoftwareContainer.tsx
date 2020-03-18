import React, {useState} from "react";
import AddSoftwareComponent from "../components/AddSoftwareComponent";
import NavBarContainer from "./NavBarContainer";
import {useMutation} from "@apollo/react-hooks";
import {Me} from "../../repositories/GraphQLSchema";
import {CREATE_SOFTWARE} from "../../repositories/SoftwareComponentRepository";
import {useHistory} from "react-router-dom";

export default function AddSoftwareContainer(props : any) {

    const [AddSoftware, {loading, error, data}] = useMutation<{addSoftware : Me}>(CREATE_SOFTWARE);

    const projectId = props.match.params.projectId

    const [name, setName] = useState("");
    const [metricType, setMetricType] = useState("");
    const [collectorType, setCollectorType] = useState("");
    const [token, setToken] = useState("");
    const [url, setUrl] = useState("");
    const history = useHistory();

    const validate = () => {
        alert(collectorType)
        if(name.length < 2) return false
        if(token.length < 2) return false
        if(url.length < 2) return false

        return true
    }

    const addClicked = () => {
        AddSoftware({variables : {projectId: projectId, name:name, collectorType:collectorType, resourceUrl:url, token:token}})
    }

    if(data && data.addSoftware && data.addSoftware.project.createSoftwareComponent.id) {
        history.push('/software/' + projectId + '/' + data.addSoftware.project.createSoftwareComponent.id.toString() + '/')
    }

    return (
        <div>
            <NavBarContainer/>
            <AddSoftwareComponent
                name={name}
                metricType={metricType}
                collectorType={collectorType}
                token={token}
                resourceUrl={url}
                isLoading={loading}
                onNameChange={setName}
                onMetricTypeChange={setMetricType}
                onCollectorTypeChange={setCollectorType}
                onTokenChange={setToken}
                onResourceUrlChange={setUrl}
                validate={validate}
                onAddClicked={addClicked}
            />
        </div>
    );
}