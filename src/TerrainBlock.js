import React, {Fragment} from 'react';
import {Box} from '@mui/material';
import {BLOCK_SIZE} from "./constants";
import './App.css';
import plain from './images/terrain/tile_grass_64.png'
import water from './images/terrain/water.png'
import redHQ from './images/terrain/HQred.png'
import blueHQ from './images/terrain/HQblue.png'
import redFactory from './images/terrain/FactoryRed.png'
import blueFactory from './images/terrain/FactoryBlue.png'
import noUnit from './images/units/noUnit.png'
import redTank from './images/units/tankRed.png'
import blueTank from './images/units/tankBlue.png'

const TerrainBlock = (props) => {
    let terrainSrc;
    let defense = 0;
    let unitSrc;

    if(props.type === 'Plain') {
        terrainSrc = plain;
        defense = 1;
    }
    else if(props.type === 'blueHQ') {
        terrainSrc = blueHQ;
        defense = 4;
    }
    else if(props.type === 'blueFactory') {
        terrainSrc = blueFactory;
        defense = 3;
    }
    else if(props.type === 'redHQ') {
        terrainSrc = redHQ;
        defense = 4;
    }
    else if(props.type === 'redFactory') {
        terrainSrc = redFactory;
        defense = 3;
    }
    else if(props.type === 'Water') terrainSrc = water;

    if(props.unit === "redTank")
    {
        unitSrc = redTank;
    }
    else if(props.unit === "blueTank")
    {
        unitSrc = blueTank;
    }
    else
    {
        unitSrc = noUnit;
    }

    return (

        <Fragment>
            <Box sx={{width:BLOCK_SIZE, height:BLOCK_SIZE}}>
                <div className="parent">
                    <img className="mapImage" src={terrainSrc} alt={props.type} />
                    <img className="unitImage" src={unitSrc} alt={props.type} />
                </div>
            </Box>
        </Fragment>
    )
}

export default TerrainBlock;