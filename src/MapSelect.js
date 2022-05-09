import { Grid, Typography, Box } from '@mui/material';
import React, {useState, useEffect, Fragment} from 'react';
import StatBox from "./StatBox";
import map1 from './images/maps/tt1.png'
import map2 from './images/maps/tt2.png'
import map3 from './images/maps/tt3.png'
import map4 from './images/maps/tt4.png'

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

    function m3(){
        console.log(`Click event, map 3 selected.`)
        setMapNum(2)
    }

    function m4(){
        console.log(`Click event, map 4 selected.`)
        setMapNum(3)
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
            <Box className="backgroundPattern"
                 sx={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                 }}
                 height="100vh"
                 width="100vw">
                <Box sx={{my: 5, border: 2, borderRadius: '4px', backgroundColor: '#444444'}}>
                    <Typography className="playerText" align='center' sx={{fontSize: 60}}>
                        Map Select
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    {props.user1 !== 'Guest' ? (
                        <StatBox color={'Red'} stats={props.user1} username={props.user1.Username} total={true}></StatBox>
                    ) : <Box sx={{width: '350px'}}/>}
                    <Box sx={{width: '1075px', mx: 5}}>
                        <Grid container columns={2} align='center' columnSpacing='50px' rowSpacing='50px'>

                            <Grid item xs={1}>
                                <button style={{cursor: 'pointer'}}><img src={map1} alt="Map 1" onClick={m1}/></button>
                            </Grid>

                            <Grid item xs={1}>
                                <button style={{cursor: 'pointer'}}><img src={map2} alt="Map 2" onClick={m2}/></button>
                            </Grid>

                            <Grid item xs={1}>
                                <button style={{cursor: 'pointer'}}><img src={map3} alt="Map 3" onClick={m3}/></button>
                            </Grid>

                            <Grid item xs={1}>
                                <button style={{cursor: 'pointer'}}><img src={map4} alt="Map 4" onClick={m4}/></button>
                            </Grid>

                        </Grid>
                    </Box>
                    {props.user2 !== 'Guest' ? (
                        <StatBox color={'Blue'} stats={props.user2} username={props.user2.Username} total={true}></StatBox>
                    ) : <Box sx={{width: '350px'}}/>}
                </Box>
            </Box>
        </Fragment>
    )
}