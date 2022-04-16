import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';

const TopMessage = (prop) => {
    const whosTurn = prop.whosTurn;
    return (
        <Fragment >
            <Typography variant='h3' margin='auto'>
                {whosTurn}'s turn
            </Typography>
        </Fragment>
    )
}

export default TopMessage;