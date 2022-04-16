import React, {Fragment} from 'react';
import {Box, Grid} from '@mui/material';
import {BLOCK_SIZE} from "./constants";
import MapRender from "./MapRender";
import plain from './images/terrain/tile_grass_64.png'

const Map = (props) => {
    // const mapArray = Object.assign(Array(MAP_HEIGHT).fill(Array(MAP_WIDTH).fill({Type:'Plain', Defense: 1})));
    const mapArray = [];
    let tempArray = [];

    const height = props.MAP_HEIGHT
    const width = props.MAP_WIDTH

    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            tempArray.push({type: plain, defense: 1})
        }
        mapArray.push(tempArray)
        tempArray = []
    }

    //Type, defence, row, col?
    const mapEdit = [...props.mapEdits];

    while(mapEdit.length > 0){
        let bloc = mapEdit.shift();

        let type = bloc.type;
        let defence = bloc.defense;
        let row = bloc.Row;
        let col = bloc.Column;
        mapArray[row][col].type = type;
        mapArray[row][col].defense = defence;
    }

    const onClickCallback = props.onClickCallback;
    const unitArray = props.unitsArray;

    return (
        <Fragment>
            <Box sx={{width: width * BLOCK_SIZE, height: height * BLOCK_SIZE}}>
                <Grid container columns={width}>
                    {
                        mapArray.map((row, rowIdx) => row.map((col, colIdx) =>
                            <Grid onClick={() => onClickCallback(rowIdx,colIdx)} key={colIdx}>
                            <MapRender key={colIdx} type={mapArray[rowIdx][colIdx].type} unit={unitArray[rowIdx][colIdx].type}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Fragment>
    )
}

export default Map;