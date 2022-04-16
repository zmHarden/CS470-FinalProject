import React, {Fragment} from 'react';
import {Box} from '@mui/material';
import {BLOCK_SIZE} from "./constants";
import './App.css';

const MapRender = (props) => {
    let terrainSrc = props.type;
    let unitSrc = props.unit;

    return (

        <Fragment>
            <Box sx={{width:BLOCK_SIZE, height:BLOCK_SIZE}}>
                <div className="parent">
                    <img className="mapImage" src={terrainSrc} alt={"terrain"} />
                    <img className="unitImage" src={unitSrc} alt={"unit"} />
                </div>
            </Box>
        </Fragment>
    )
}

export default MapRender;