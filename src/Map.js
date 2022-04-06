import React, {Fragment} from 'react';
import {Box, Grid} from '@mui/material';
import {BLOCK_SIZE, MAP_WIDTH, MAP_HEIGHT} from "./constants";
import TerrainBlock from "./TerrainBlock";

const Map = (props) => {
    // const mapArray = Object.assign(Array(MAP_HEIGHT).fill(Array(MAP_WIDTH).fill({Type:'Plain', Defense: 1})));
    const mapArray = [];
    let tempArray = [];

    const height = props.MAP_HEIGHT
    const width = props.MAP_WIDTH

    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            tempArray.push({Type:'Plain', Defense: 1})
        }
        mapArray.push(tempArray)
        tempArray = []
    }

    //Type, defence, row, col?
    const mapEdit = props.mapEdits;
    while(mapEdit.length > 0){
        let bloc = mapEdit.shift();
        console.log(bloc);
        let type = bloc.Type;
        let defence = bloc.Defense;
        let row = bloc.Row;
        let col = bloc.Column;
        mapArray[row][col].Type = type;
        mapArray[row][col].Defense = defence;
    }

    // mapArray[1][1].Type = 'blueHQ';
    // mapArray[8][14].Type = 'redHQ';
    console.log(mapArray)
    return (
        <Fragment>
            <Box sx={{width: MAP_WIDTH * BLOCK_SIZE, height: MAP_HEIGHT * BLOCK_SIZE}}>
                <Grid container columns={MAP_WIDTH}>
                    {
                        mapArray.map((row, rowIdx) => row.map((col, colIdx) =>
                                <TerrainBlock key={colIdx}
                                              type={col.Type}
                                />
                            ))
                    }
                </Grid>
            </Box>
        </Fragment>
    )
}

export default Map;