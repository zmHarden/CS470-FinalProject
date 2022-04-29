import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import './App.css';


const TopMessage = (prop) => {
    const whosTurn = prop.whosTurn;
    const player1 = prop.redPlayer;
    const player2 = prop.bluePlayer;

    return (
        <Fragment >
            <br/>
            <Typography className="playerText" variant='h3' margin='auto' sx={{ border: 3, borderColor: 'black', borderRadius: '4px', backgroundColor: whosTurn }}>
                {whosTurn}'s turn
            </Typography>
            <br/>

            <Grid container justifyContent="center" sx={{  width: 1024}} direction="row" columns={1}>

                <Grid container justifyItems="left"  sx={{ border: 2, borderColor: 'black', borderRadius: '4px', backgroundColor: 'red', width: 510}} direction="column">
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

                <Grid container justifyContent="center" sx={{ border: 2, borderColor: 'black', borderRadius: '4px', backgroundColor: 'blue', width: 510}} direction="column">
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
    )
}

export default TopMessage;