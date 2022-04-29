import React, {Fragment} from 'react';
import {Box, Grid} from '@mui/material';
import {BLOCK_SIZE} from "./constants";
import MapRender from "./MapRender";

const Map = (props) => {

    const height = props.MAP_HEIGHT
    const width = props.MAP_WIDTH

    const mapArray = props.mapArray;
    const onClickCallback = props.onClickCallback;
    const unitArray = props.unitsArray;

    let scrollBars = "hidden";

    if(height > 10 || width > 16) {scrollBars = "scroll"}

    return (
        <Fragment>
                <Box overflow={scrollBars} sx={{width: 16 * BLOCK_SIZE, height: 10 * BLOCK_SIZE}}>
                    <Grid sx={{width: width * BLOCK_SIZE, height: height * BLOCK_SIZE}} container columns={width}>
                        {
                            mapArray.map((row, rowIdx) => row.map((col, colIdx) =>
                                <Grid onClick={(event) => onClickCallback(rowIdx,colIdx,event)} key={colIdx}>
                                    <MapRender
                                        key={colIdx}
                                        terrain={mapArray[rowIdx][colIdx].img}
                                        unit={unitArray[rowIdx][colIdx].img}
                                        health={unitArray[rowIdx][colIdx].health}
                                        damage={unitArray[rowIdx][colIdx].damage}
                                        captureDamage={mapArray[rowIdx][colIdx].health}
                                        highlight={mapArray[rowIdx][colIdx].highlight}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
        </Fragment>
    )
}

export default Map;

