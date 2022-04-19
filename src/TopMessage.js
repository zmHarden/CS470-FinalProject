import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";

const TopMessage = (prop) => {
    const whosTurn = prop.whosTurn;
    const player1 = prop.redPlayer;
    const player2 = prop.bluePlayer;
    return (
        <Fragment >
            <Typography variant='h3' margin='auto'>
                {whosTurn}'s turn
            </Typography>
            <Grid container justifyContent="center">
                <Grid item xs={7}>
                    <Typography>
                        Player 1 - Red:
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        Player 2 - Blue:
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography>
                        Funds: {player1.funds}, Properties: {player1.properties}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        Funds: {player2.funds}, Properties: {player2.properties}
                    </Typography>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default TopMessage;