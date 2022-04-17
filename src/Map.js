import React, {Fragment, useState} from 'react';
import {Box, Grid} from '@mui/material';
import {BLOCK_SIZE} from "./constants";
import MapRender from "./MapRender";
import plain from './images/terrain/tile_grass_64.png'

const Map = (props) => {
    const height = props.MAP_HEIGHT
    const width = props.MAP_WIDTH

    const mapArrayProto = [];

    for(let i = 0; i < height; i++){
        let tempArray = [];
        for(let j = 0; j < width; j++){
            tempArray.push({type: plain, defense: 1, moveCost: 2, movable: false});
        }
        mapArrayProto.push(tempArray);
    }

    const mapEdit = [...props.mapEdits];

    while(mapEdit.length > 0){
        let bloc = mapEdit.shift();

        let type = bloc.type;
        let defence = bloc.defense;
        let row = bloc.Row;
        let col = bloc.Column;
        mapArrayProto[row][col].type = type;
        mapArrayProto[row][col].defense = defence;
    }

    const [mapArray, setMapArray] = useState(mapArrayProto);

    const onClickCallback = props.onClickCallback;
    const unitArray = props.unitsArray;

    return (
        <Fragment>
            <Box sx={{width: width * BLOCK_SIZE, height: height * BLOCK_SIZE}}>
                <Grid container columns={width}>
                    {
                        mapArray.map((row, rowIdx) => row.map((col, colIdx) =>
                            <Grid onClick={() => onClickCallback(rowIdx,colIdx,mapArray,setMapArray)} key={colIdx}>
                            <MapRender key={colIdx} type={mapArray[rowIdx][colIdx].type} unit={unitArray[rowIdx][colIdx].type} health={unitArray[rowIdx][colIdx].health}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Fragment>
    )
}

export default Map;
