import React, {Fragment} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import './App.css';

const StatBox = (props) => {
    const color = props.color;
    const stats = props.stats;
    const username = props.username;
    const total = props.total;
    let winRate = 0;
    if(stats.GamesPlayed > 0) winRate = stats.Wins / stats.GamesPlayed

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
                            Games Played: {stats.GamesPlayed}
                        </Typography>
                    </Grid>}

                    {total && <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Win Rate: {(winRate).toPrecision(3)}
                        </Typography>
                    </Grid>}

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Units Destroyed: {stats.UnitsDestroyed}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Units Lost: {stats.UnitsLost}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Properties Captured: {stats.PropertiesCaptured}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Damage Dealt: {stats.DamageDealt}
                        </Typography>
                    </Grid>

                </Grid>
            </Box>
        </Fragment>
    );
}

export default StatBox;