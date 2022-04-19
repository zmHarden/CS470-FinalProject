import React, {Fragment, useState} from 'react';
import {Box, Grid} from '@mui/material';
import {BLOCK_SIZE} from "./constants";
import MapRender from "./MapRender";
import TerrainTypes from "./TerrainTypes";

const Map = (props) => {
    const height = props.MAP_HEIGHT
    const width = props.MAP_WIDTH

    const mapArrayProto = [];

    for(let i = 0; i < height; i++){
        let tempArray = [];
        for(let j = 0; j < width; j++){
            tempArray.push({...TerrainTypes.plain})
        }
        mapArrayProto.push(tempArray);
    }

    const mapEdit = [...props.mapEdits];

    while(mapEdit.length > 0){
        let bloc = mapEdit.shift();

        // let type = bloc.type;
        // let defence = bloc.defense;
        // let row = bloc.Row;
        // let col = bloc.Column;
        // mapArrayProto[row][col].type = type;
        // mapArrayProto[row][col].defense = defence;
        mapArrayProto[bloc.Row][bloc.Column] = {...bloc};
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
                            <MapRender
                                key={colIdx}
                                terrain={mapArray[rowIdx][colIdx].img}
                                unit={unitArray[rowIdx][colIdx].img}
                                health={unitArray[rowIdx][colIdx].health}
                                damage={unitArray[rowIdx][colIdx].damage}
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

