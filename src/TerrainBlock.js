import React, {Fragment} from 'react';
import {Box} from '@mui/material';
import {BLOCK_SIZE} from "./constants";
import plain from './images/terrain/plain32.png'
import water from './images/terrain/water32.png'

const TerrainBlock = (props) => {
    let src;
    if(props.type === 'Plain') src = plain;
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