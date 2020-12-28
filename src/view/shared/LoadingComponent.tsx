import React from 'react';
import {CircularProgress} from "@material-ui/core";

export default function LoadingComponent() {

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress/>
            </div>
        </div>
    );
}

