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

            <Grid container justifyContent="center" align-items="center" sx={{ border: 2, borderColor: 'black', borderRadius: '4px', backgroundColor: 'white'}} direction="row" columns={1}>

                <Grid container justifyContent="left" align-items="center" sx={{ border: 2, borderColor: 'black', borderRadius: '4px', backgroundColor: 'red'}} direction="column">
                    <Grid item >
                        <Typography className="playerText">
                            Player 1 - Red:
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography className="playerText">
                            Funds: {player1.funds}, Properties: {player1.properties}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container justifyContent="right" align-items="center" sx={{ border: 2, borderColor: 'black', borderRadius: '4px', backgroundColor: 'blue'}} direction="column">
                    <Grid item>
                        <Typography className="playerText">
                            Player 2 - Blue:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography className="playerText">
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