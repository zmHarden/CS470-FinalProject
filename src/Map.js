import React, {Fragment} from 'react';
import {Box, Grid} from '@mui/material';
import {BLOCK_SIZE, MAP_WIDTH, MAP_HEIGHT} from "./constants";
import TerrainBlock from "./TerrainBlock";

const Map = () => {
    const mapArray = Array(MAP_HEIGHT).fill(Array(MAP_WIDTH).fill({Type:'Plain', Defense: 1}));
    const junko = require('./Map1.JSON')
    //console.log(Object.keys(junko))
    //let obj = JSON.parse(junko)
    const mapEdits = Object.keys(junko).map(key => junko[key]);
    //console.log

    //Type, defence, row, col?
    while(mapEdits.size > 0){
        let bloc = mapEdits.shift();
        console.log(bloc)
        let type = bloc.Type;
        let defence = bloc.Defence;
        let row = bloc.Row;
        let col = bloc.Column;
        mapArray[row][col].Type = type;
        mapArray[row][col].Defense = defence;
    }


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