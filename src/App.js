import './App.css';
import React, {Fragment} from "react";
import {Box, Grid} from "@mui/material";
import Map from "./Map";
//import TerrainBlock from "./TerrainBlock";

function App() {
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
                <Map/>
            </Box>
        </Fragment>
    )
}

export default App;
