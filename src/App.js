import './App.css';
import React, {Fragment, useState} from "react";
import {Box, Grid} from "@mui/material";
import Map from "./Map";
import MapEdit from "./mapEdit"; //Definitions on what tiles differ from the generic all-plains map
import {MapSize} from "./mapEdit"; //Size of map used
//import TerrainBlock from "./TerrainBlock";

function App() {

    const unitArrayProto = [];
    let tempArray = [];

    for(let i = 0; i < MapSize[0]; i++)
    {
        for(let j = 0; j < MapSize[1]; j++)
        {
            tempArray.push("noUnit")
        }
    }

    return (
        <Fragment>
            <Box margin='auto'
                 sx={{
                     height: 640,
                     width: 1024,
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                 }}
            >
                <Map mapEdits={MapEdit()}  MAP_HEIGHT={MapSize[0]} MAP_WIDTH={MapSize[1]} />
            </Box>
        </Fragment>
    )
}

export default App;
