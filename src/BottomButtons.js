import React, {Fragment} from 'react';

const BottomButton = (props) => {

    return (
        <Fragment >
            <button
                disabled={!(props.disableButtons) || props.isFiring || props.movingUnit}
                style={{cursor: (props.disableButtons === true ? 'pointer' : '')}}
                onClick={props.newTurn}
            >
                End Turn
            </button>

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
            <br/>
        </Fragment>
    )
}

export default BottomButton;