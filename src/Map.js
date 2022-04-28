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

    return (
        <Fragment>
            <Box sx={{width: width * BLOCK_SIZE, height: height * BLOCK_SIZE}}>
                <Grid container columns={width}>
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

