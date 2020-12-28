import React from 'react';
import Chip from '@material-ui/core/Chip';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

export default function ErrorComponent() {

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <div>
                    <ErrorOutlineOutlinedIcon/>
                </div>
                <div>
                    <Chip label="Something went wrong"/>
                </div>
            </div>
        </div>
    );
}

