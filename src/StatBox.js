import React, {Fragment} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import './App.css';

const StatBox = (props) => {
    const color = props.color;
    const player = props.player;
    const total = props.total;

    let username;
    if (player.user === "Guest"){
        if(color === "Red") username = "Player 1"
        else username = "Player 2"
    } else username = player.user.Username

    return (
        <Fragment>
            <Box sx={{mt: 5, width: 350}}>
                <Grid container className={color} justifyContent="center"  sx={{border: 2, borderRadius: '4px'}} direction="column">

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 35}}>
                            {`${username}'s Stats`}
                        </Typography>
                    </Grid>

                    {total && <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Games Played: {player.stats.gamesPlayed}
                        </Typography>
                    </Grid>}

                    {total && <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Win Rate: {player.stats.wins / player.stats.gamesPlayed}
                        </Typography>
                    </Grid>}

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Units Destroyed: {player.stats.unitsDestroyed}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Units Lost: {player.stats.unitsLost}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Properties Captured: {player.stats.propertiesCaptured}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Damage Dealt: {player.stats.damageDealt}
                        </Typography>
                    </Grid>

                </Grid>
            </Box>
        </Fragment>
    );
}

export default StatBox;