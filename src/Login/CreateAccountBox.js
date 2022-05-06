import React, {Fragment, useEffect, useState} from 'react';
import {Box, Button, Divider, TextField, Typography} from "@mui/material";
import API from "../API_Interface";
import '../App.css';

const CryptoJS = require('crypto-js');

const encrypt = (password) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
};

const CreateAccountBox = (props) => {
    const [userInput1, setUserInput1] = useState('');
    const [pwInput1, setPWInput1] = useState('');
    const [confirmPWInput1, setConfirmPWInput1] = useState('');
    const [verifyUser1, setVerifyUser1] = useState(false);
    const [authFailed1, setAuthFailed1] = useState(false);
    const [authSuccess1, setAuthSuccess1] = useState(false);

    const [userInput2, setUserInput2] = useState('');
    const [pwInput2, setPWInput2] = useState('');
    const [confirmPWInput2, setConfirmPWInput2] = useState('');
    const [verifyUser2, setVerifyUser2] = useState(false);
    const [authFailed2, setAuthFailed2] = useState(false);
    const [authSuccess2, setAuthSuccess2] = useState(false);

    const handleInputChange1 = event => {
        console.log("handleInputChange1 called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserInput1(event.target.value);
        setAuthFailed1(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input 1.");
            setVerifyUser1(true);
        }
    };

    const handlePWChange1 = event => {
        console.log("handlePWChange1 called.");

//        event.stopPropagation();
//        event.preventDefault();

        setPWInput1(event.target.value);
        setAuthFailed1(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input 1.");
            setVerifyUser1(true);
        }
    };

    const handleConfirmPWChange1 = event => {
        console.log("handleConfirmPWChange1 called.");

//        event.stopPropagation();
//        event.preventDefault();

        setConfirmPWInput1(event.target.value);
        setAuthFailed1(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input 1.");
            setVerifyUser1(true);
        }
    };

    const handleInputChange2 = event => {
        console.log("handleInputChange2 called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserInput2(event.target.value);
        setAuthFailed2(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input 2.");
            setVerifyUser2(true);
        }
    };

    const handlePWChange2 = event => {
        console.log("handlePWChange2 called.");

//        event.stopPropagation();
//        event.preventDefault();

        setPWInput2(event.target.value);
        setAuthFailed2(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input 2.");
            setVerifyUser2(true);
        }
    };

    const handleConfirmPWChange2 = event => {
        console.log("handleConfirmPWChange2 called.");

//        event.stopPropagation();
//        event.preventDefault();

        setConfirmPWInput2(event.target.value);
        setAuthFailed2(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input 2.");
            setVerifyUser2(true);
        }
    };

    const getButtons1 = () => {
        if(authSuccess1){
            return (
                <Fragment>
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => {setVerifyUser1(true)}}
                            sx={{mx: 2, my: 1, backgroundColor: '#ff9296',
                                "&:hover": { backgroundColor: '#ff9296' }}}
                        >Create Account</Button>
                        <Button
                            disabled={true}
                            variant="contained"
                            size="medium"
                            sx={{mx: 2, my: 1, backgroundColor: '#444444'}}
                        >Back to Login</Button>
                    </Box>
                </Fragment>
            );
        }else{
            return (
                <Fragment>
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => {setVerifyUser1(true)}}
                            sx={{mx: 2, my: 1, backgroundColor: '#444444',
                                "&:hover": { backgroundColor: '#898989' }}}
                        >Create Account</Button>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => {props.setCreateAccount1(false)}}
                            sx={{mx: 2, my: 1, backgroundColor: '#444444',
                                "&:hover": { backgroundColor: '#898989' }}}
                        >Back to Login</Button>
                    </Box>
                </Fragment>
            );
        }
    }

    const getButtons2 = () => {
        if(authSuccess2){
            return (
                <Fragment>
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => {setVerifyUser2(true)}}
                            sx={{mx: 2, my: 1, backgroundColor: '#60cfff',
                                "&:hover": { backgroundColor: '#60cfff' }}}
                        >Create Account</Button>
                        <Button
                            disabled={true}
                            variant="contained"
                            size="medium"
                            sx={{mx: 2, my: 1, backgroundColor: '#444444'}}
                        >Back to Login</Button>
                    </Box>
                </Fragment>
            );
        }else{
            return (
                <Fragment>
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => {setVerifyUser2(true)}}
                            sx={{mx: 2, my: 1, backgroundColor: '#444444',
                                "&:hover": { backgroundColor: '#898989' }}}
                        >Create Account</Button>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => {props.setCreateAccount2(false)}}
                            sx={{mx: 2, my: 1, backgroundColor: '#444444',
                                "&:hover": { backgroundColor: '#898989' }}}
                        >Back to Login</Button>
                    </Box>
                </Fragment>
            );
        }
    }

    useEffect(() => {
        console.log('in useEffect');

        if(verifyUser1) {
            if (userInput1.length > 0 && pwInput1.length > 0 && confirmPWInput1 === pwInput1) {
                //props.setUser1('User1');
                //setAuthSuccess1(true);

                const api = new API();
                async function createAccount1() {
                    console.log('in createAccount1');
                    api.createAccount(userInput1, encrypt(pwInput1))
                        .then(userInfo => {
                            console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                            const user = userInfo.user;
                            if (userInfo.status === "OK") {
                                props.setUser1(user);
                                setAuthSuccess1(true);
                            } else {
                                setVerifyUser1(false);
                                setAuthFailed1(true);
                            }
                        });
                }

                createAccount1();
            } else {
                setVerifyUser1(false);
                setAuthFailed1(true);
                setAuthSuccess1(false);
            }
        }

        if(verifyUser2) {
            if (userInput2.length > 0 && pwInput2.length > 0 && confirmPWInput2 === pwInput2) {
                //props.setUser2('User2');
                //setAuthSuccess2(true);

                const api = new API();
                async function createAccount2() {
                    console.log('in createAccount2');
                    api.createAccount(userInput2, encrypt(pwInput2))
                        .then(userInfo => {
                            console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                            const user = userInfo.user;
                            if (userInfo.status === "OK") {
                                props.setUser2(user);
                                setAuthSuccess2(true);
                            } else {
                                setVerifyUser2(false);
                                setAuthFailed2(true);
                            }
                        });
                }

                createAccount2();
            } else {
                setVerifyUser2(false);
                setAuthFailed2(true);
                setAuthSuccess2(false);
            }
        }
    }, [verifyUser1, props.setUser1, userInput1, pwInput1, confirmPWInput1,
        verifyUser2, props.setUser2, userInput2, pwInput2, confirmPWInput2]);


    if(props.player === 'Red'){
        return (
            <Fragment>
                <Box sx={{width: 400, height: 488,
                    border:2, borderRadius: '4px',
                    backgroundColor: '#b81e23', mx:5, mt:5}}>
                    <Typography align="center" className="playerText" sx={{fontSize: 35, mt: 1}}>
                        Create Account
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                        <TextField
                            variant="filled"
                            disabled={props.user1 !== undefined}
                            error={authFailed1}
                            label="Username"
                            placeholder=""
                            value={userInput1}
                            onChange={handleInputChange1}
                            sx={{my: 1,
                                width: 250,
                                backgroundColor: 'white',
                                borderRadius: '4px',}}
                        />
                        <Divider />
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                        <TextField
                            variant="filled"
                            disabled={props.user1 !== undefined}
                            error={authFailed1}
                            label="Password"
                            type="password"
                            placeholder=""
                            value={pwInput1}
                            onChange={handlePWChange1}
                            sx={{my: 1,
                                width: 250,
                                backgroundColor: 'white',
                                borderRadius: '4px',}}
                        />
                        <Divider />
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                        <TextField
                            variant="filled"
                            disabled={props.user1 !== undefined}
                            error={authFailed1}
                            label="Confirm Password"
                            type="password"
                            placeholder=""
                            value={confirmPWInput1}
                            onChange={handleConfirmPWChange1}
                            sx={{my: 1,
                                width: 250,
                                backgroundColor: 'white',
                                borderRadius: '4px',}}
                        />
                        <Divider />
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                        {getButtons1()}
                    </Box>
                </Box>
            </Fragment>
        );
    }else{
        return (
            <Fragment>
                <Box sx={{width: 400, height: 488,
                    border:2, borderRadius: '4px',
                    backgroundColor: '#006692', mx:5, mt:5}}>
                    <Typography align="center" className="playerText" sx={{fontSize: 35, mt: 1}}>
                        Create Account
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                        <TextField
                            variant="filled"
                            disabled={props.user2 !== undefined}
                            error={authFailed2}
                            label="Username"
                            placeholder=""
                            value={userInput2}
                            onChange={handleInputChange2}
                            sx={{my: 1,
                                width: 250,
                                backgroundColor: 'white',
                                borderRadius: '4px',}}
                        />
                        <Divider />
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                        <TextField
                            variant="filled"
                            disabled={props.user2 !== undefined}
                            error={authFailed2}
                            label="Password"
                            type="password"
                            placeholder=""
                            value={pwInput2}
                            onChange={handlePWChange2}
                            sx={{my: 1,
                                width: 250,
                                backgroundColor: 'white',
                                borderRadius: '4px',}}
                        />
                        <Divider />
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                        <TextField
                            variant="filled"
                            disabled={props.user2 !== undefined}
                            error={authFailed2}
                            label="Confirm Password"
                            type="password"
                            placeholder=""
                            value={confirmPWInput2}
                            onChange={handleConfirmPWChange2}
                            sx={{my: 1,
                                width: 250,
                                backgroundColor: 'white',
                                borderRadius: '4px',}}
                        />
                        <Divider />
                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                        {getButtons2()}
                    </Box>
                </Box>
            </Fragment>
        );
    }
}

export default CreateAccountBox;