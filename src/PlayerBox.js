import React, {Fragment} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import './App.css';


const PlayerBox = (props) => {
    const player = props.player;
    const player1 = props.redPlayer;
    const player2 = props.bluePlayer;

    if(player === 'Red'){
        return (
            <Fragment>
                <Box sx={{mx:10, width: 250}}>
                    <Grid container justifyContent="center"  sx={{border: 2, borderRadius: '4px', backgroundColor: '#b81e23'}} direction="column">
                        <Grid item>
                            <Typography align="center" className="playerText" sx={{fontSize: 35}}>
                                Player 1
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                                Funds: {player1.funds}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                                Properties: {player1.properties}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Fragment>
        );
    }else{
        return (
            <Box sx={{mx:10, width: 250}}>
                <Grid container justifyContent="center" sx={{border: 2, borderRadius: '4px', backgroundColor: '#006692'}} direction="column">
                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 35}}>
                            Player 2
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Funds: {player2.funds}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Properties: {player2.properties}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default PlayerBox;