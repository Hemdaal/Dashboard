import React, {useState} from "react";
import AddSoftwareComponent from "../components/AddSoftwareComponent";
import NavBarContainer from "./NavBarContainer";
import {useMutation} from "@apollo/react-hooks";
import {Me} from "../../repositories/GraphQLSchema";
import {CREATE_SOFTWARE} from "../../repositories/SoftwareComponentRepository";
import {useHistory, useParams} from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent";

export default function AddSoftwareContainer() {

    const [AddSoftware, {loading, error, data}] = useMutation<{ me: Me }>(CREATE_SOFTWARE, {
        onCompleted(data) {
            if (data && data.me && data.me.project.createSoftwareComponent.id) {
                history.push('/project/' + projectId + '/software/' + data.me.project.createSoftwareComponent.id.toString())
            }
        }
    });

    const {projectId} = useParams()
    const [name, setName] = useState("");
    const [metricType, setMetricType] = useState("REPO");
    const [collectorType, setCollectorType] = useState("GITHUB_REPO");
    const [token, setToken] = useState("");
    const [url, setUrl] = useState("");
    const history = useHistory();

    const validate = () => {
        if (name.length < 2) return false
        if (token.length < 2) return false
        if (url.length < 2) return false

        return true
    }

    const addClicked = () => {
        AddSoftware({
            variables: {
                projectId: projectId,
                name: name,
                collectorType: collectorType,
                resourceUrl: url,
                token: token
            }
        })
    }

    if (projectId) {
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
    } else {
        return (<ErrorComponent/>);
    }
}