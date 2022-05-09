import React, {Fragment} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import './App.css';

const PlayerBox = (props) => {
    const color = props.color;
    const player = props.player;
    const username = props.username;

    return (
        <Fragment>
            <Box sx={{mx:10, width: 250}}>
                <Grid container className={color} justifyContent="center"  sx={{border: 2, borderRadius: '4px'}} direction="column">
                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 35}}>
                            {username}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Funds: {player.funds}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Properties: {player.properties}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" className="playerText" sx={{fontSize: 20}}>
                            Units: {player.units}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}

export default PlayerBox;