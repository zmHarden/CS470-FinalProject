import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const BottomButton = (prop) => {
    const onClickCallback = prop.onClickCallback;

    return (
        <Fragment >
            <Box
                sx={{
                    width: 100,
                    height: 64,
                    border: 1,
                    borderColor: 'black',
                }}
                onClick={() => onClickCallback()}
            >
                <Typography align="center">
                    End Turn
                </Typography>
            </Box>
        </Fragment>
    )
}

export default BottomButton;