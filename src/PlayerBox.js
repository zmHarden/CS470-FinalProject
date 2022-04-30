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
    /*return (
        <Fragment >

            <Grid container justifyContent="center" sx={{  width: 1024}} direction="row" columns={1}>

                <Grid container justifyItems="left"  sx={{ border: 0, borderColor: 'black', borderRadius: '4px', backgroundColor: '#b81e23', width: 510}} direction="column">
                    <Grid item>
                        <Typography align="center" className="playerText">
                            Player 1 - Red:
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography align="center" className="playerText">
                            Funds: {player1.funds}, Properties: {player1.properties}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" sx={{ border: 0, borderColor: 'black', borderRadius: '4px', backgroundColor: '#006692', width: 510}} direction="column">
                    <Grid item>
                        <Typography align="center" className="playerText">
                            Player 2 - Blue:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography align="center" className="playerText">
                            Funds: {player2.funds}, Properties: {player2.properties}
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>
            <br/>
        </Fragment>
    )*/
}

export default PlayerBox;