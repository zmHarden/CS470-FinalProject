import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import './App.css';


const TopMessage = (props) => {
    const whosTurn = props.whosTurn;
    //const player1 = props.redPlayer;
    //const player2 = props.bluePlayer;

    if(whosTurn === 'Red') {
        return (
            <Fragment>
                <br/>
                <Typography className="playerText" variant='h3' margin='auto'
                            sx={{border: 2, borderColor: 'black', borderRadius: '4px', backgroundColor: '#b81e23', fontSize: 60}}>
                    Day {props.day}
                </Typography>
                <br/>
            </Fragment>
        )
    }else{
        return (
            <Fragment>
                <br/>
                <Typography className="playerText" variant='h3' margin='auto'
                            sx={{border: 2, borderColor: 'black', borderRadius: '4px', backgroundColor: '#006692', fontSize: 60}}>
                    Day {props.day}
                </Typography>
                <br/>
            </Fragment>
        )
    }
}

export default TopMessage;