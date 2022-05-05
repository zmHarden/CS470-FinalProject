import React, {Fragment} from 'react';
import {Box} from "@mui/material";

const PopupButtons = (props) => {

    return (
        <Fragment >
            <Box sx={{display: "flex", flexDirection: "column", spaceBetween: "10"}} >
                <button
                    disabled={props.disableButtons}
                    style={{cursor: (props.disableButtons === false ? 'pointer' : '')}}
                    onClick={props.confirmMove}
                >
                    Confirm Move
                </button>

                <button
                    disabled={props.disableButtons}
                    style={{cursor: (props.disableButtons === false ? 'pointer' : '')}}
                    onClick={props.cancelMove}
                >
                    Cancel Move
                </button>

                <button
                    disabled={!(props.canFire)}
                    style={{cursor: (props.canFire === true ? 'pointer' : '')}}
                    onClick={props.fireAndMove}
                >
                    Fire
                </button>

                <button
                    disabled={!(props.canCapture)}
                    style={{cursor: (props.canCapture === true ? 'pointer' : '')}}
                    onClick={props.captureAndMove}
                >
                    Capture
                </button>
            </Box>
        </Fragment>
    )
}

export default PopupButtons;