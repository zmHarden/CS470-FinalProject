import React, {Fragment} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import './App.css';

const PlayerBox = (props) => {
    const player = props.player;
    const player1 = props.redPlayer;
    const player2 = props.bluePlayer;

    if(player === 'Red'){
        let username = "Player 1"
        if(player1.user !== "Guest") username = player1.user.Username;
        return (
            <Fragment>
                <Box sx={{mx:10, width: 250}}>
                    <Grid container justifyContent="center"  sx={{border: 2, borderRadius: '4px', backgroundColor: '#b81e23'}} direction="column">
                        <Grid item>
                            <Typography align="center" className="playerText" sx={{fontSize: 35}}>
                                {username}
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

                        <Grid item>
                            <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                                Units: {player1.units}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Fragment>
        );
    }else{
        let username = "Player 2"
        if(player2.user !== "Guest") username = player2.user.Username;
        return (
            <Box sx={{mx:10, width: 250}}>
                <Grid container justifyContent="center" sx={{border: 2, borderRadius: '4px', backgroundColor: '#006692'}} direction="column">
                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 35}}>
                            {username}
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

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Units: {player2.units}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default PlayerBox;