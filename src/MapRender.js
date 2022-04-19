import React, {Fragment} from 'react';
import {Box} from '@mui/material';
import {BLOCK_SIZE} from "./constants";
import './App.css';
import noUnit from './images/units/noUnit.png'
import noTarget from './images/misc/noTarget.png'
import target from './images/misc/target.png'

const MapRender = (props) => {
    let terrainSrc = props.terrain;
    let unitSrc = props.unit;
    let isTarget = noTarget;

    let health = "";
    if(unitSrc !== noUnit)
    {
        health = props.health;
    }

    let damage;
    if (props.damage !== -1)
    {
        isTarget = target;
        damage = props.damage;
    }


    return (

        <Fragment>
            <Box sx={{width:BLOCK_SIZE, height:BLOCK_SIZE}}>
                <div className="parent">
                    <img className="mapImage" src={terrainSrc} alt={"terrain"} />
                    <img className="unitImage" src={unitSrc} alt={"unit"} />
                    <img className="unitImage" src={isTarget} alt={"target reticule"} />
                    <div className="healthText">{health}</div>
                    <div className="damageText">{damage}</div>
                </div>
            </Box>
        </Fragment>
    )
}

export default MapRender;