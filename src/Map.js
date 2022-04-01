import React, {Fragment} from 'react';
import {Box, Grid} from '@mui/material';
import {BLOCK_SIZE, MAP_WIDTH, MAP_HEIGHT} from "./constants";
import TerrainBlock from "./TerrainBlock";

const Map = () => {
    const mapArray = Array(MAP_HEIGHT).fill(Array(MAP_WIDTH).fill({Type:'Plain', Defense:1}));
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