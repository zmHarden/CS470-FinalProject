import React, {Fragment} from 'react';
import {Box} from '@mui/material';
import {BLOCK_SIZE} from "./constants";
import './App.css';
import noUnit from './images/units/noUnit.png'

const MapRender = (props) => {
    let terrainSrc = props.terrain;
    let unitSrc = props.unit;

    let health = "";
    if(unitSrc !== noUnit)
    {
        health = props.health;
    }

    return (

        <Fragment>
            <Box sx={{width:BLOCK_SIZE, height:BLOCK_SIZE}}>
                <div className="parent">
                    <img className="mapImage" src={terrainSrc} alt={"terrain"} />
                    <img className="unitImage" src={unitSrc} alt={"unit"} />
                    <div className="bottomRight">{health}</div>
                </div>
            </Box>
        </Fragment>
    )
}

export default MapRender;