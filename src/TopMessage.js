import React, {Fragment} from 'react';
import {Typography, Box} from '@mui/material';
import './App.css';


const TopMessage = (props) => {

    return (
        <Fragment>
            <Box className={props.whosTurn} sx={{my: 5, border: 2, borderRadius: '4px'}}>
                <Typography className="playerText" variant='h3' margin='auto' sx={{fontSize: 60}}>
                    Day {props.day}
                </Typography>
            </Box>
        </Fragment>
    )
}

export default TopMessage;