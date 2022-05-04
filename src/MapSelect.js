import { Grid, Typography } from '@mui/material';
import React, {useState, useEffect, Fragment} from 'react';
import map1 from './images/maps/tt1.png'
import map2 from './images/maps/tt2.png'

// let mapSelect = -1

export default function MapSelect (props) {
    const [mapNum, setMapNum] = useState(-1);
    function m1(){
        console.log(`Click event, map 1 selected.`)
        setMapNum(0)
    }
    
    function m2(){
        console.log(`Click event, map 2 selected.`)
        setMapNum(1)
    }
    
    useEffect(() => {
            console.log(`In useEffect`);
            if(mapNum > -1){
                console.log(`Map Selection: ${mapNum}`)
                props.setMap(mapNum)
            }
        }
    ) 
        

    return (
        <Fragment>
            <Typography align='center' sx={{fontWeight: 'bold', fontSize: 55, mb: 15, mt: 5, fontFamily: 'Cinzel',}}> Map Select </Typography>
            <Grid align='center'>
                <button style={{cursor: 'pointer'}}><img src={map1} alt="Map 1" onClick={m1}/></button>
                <button style={{cursor: 'pointer'}}><img src={map2} alt="Map 2" onClick={m2}/></button>
            </Grid>
        </Fragment>
    )
}