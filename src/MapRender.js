import React, {Fragment, useState} from 'react';
import {Box} from '@mui/material';
import {BLOCK_SIZE} from "./constants";
import './App.css';
import noUnit from './images/units/noUnit.png'
import noTarget from './images/misc/noTarget.png'
import target from './images/misc/target.png'
import captureFlag from './images/misc/captureFlag.png'

const MapRender = (props) => {
    let terrainSrc = props.terrain;
    let unitSrc = props.unit;
    let isTarget = noTarget;
    let capturing = noTarget;

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

    let capturePercent;
    if(props.captureDamage !== 200)
    {
        capturing = captureFlag;
        capturePercent = props.captureDamage + "/200";
    }

    /*const [highlight, setHighlight] = useState("noHighlight")
    if(unitSrc !== noUnit) //Temp condition for testing.
    {
        setHighlight("withHighlight");
    }*/

    return (

        <Fragment>
            <Box sx={{width:BLOCK_SIZE, height:BLOCK_SIZE}}>
                <div className="noHighlight">
                    <img className="mapImage" src={terrainSrc} alt={"terrain"} />
                    <img className="unitImage" src={unitSrc} alt={"unit"} />
                    <img className="unitImage" src={capturing} alt={"Capture Flag"} />
                    <img className="unitImage" src={isTarget} alt={"target reticule"} />
                    <div className="captureText">{capturePercent}</div>
                    <div className="healthText">{health}</div>
                    <div className="damageText">{damage}</div>
                </div>
            </Box>
        </Fragment>
    )
}

export default MapRender;