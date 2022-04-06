import React, {Fragment} from 'react';
import {Box} from '@mui/material';
import {BLOCK_SIZE} from "./constants";
import plain from './images/terrain/plain32.png'
import water from './images/terrain/water32.png'
import redHQ from './images/terrain/HQred.png'
import blueHQ from './images/terrain/HQblue.png'
import redFactory from './images/terrain/FactoryRed.png'
import blueFactory from './images/terrain/FactoryBlue.png'

const TerrainBlock = (props) => {
    let terrainSrc;
    let defense = 0;
    if(props.type === 'Plain') {
        terrainSrc = plain;
        defense = 1;
    }
    if(props.type === 'Water') src = water;
    return (
        <Fragment>
            <Box sx={{width:BLOCK_SIZE, height:BLOCK_SIZE}}>
                <img src={src} alt={props.type} />
            </Box>
        </Fragment>
    )
}

export default TerrainBlock;