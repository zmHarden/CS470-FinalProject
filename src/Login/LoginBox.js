import React, {Fragment, useEffect, useState} from 'react';
import {Box, Button, Divider, TextField, Typography} from "@mui/material";
import API from "../API_Interface";
import '../App.css';

const CryptoJS = require('crypto-js');

const encrypt = (password) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
};

const LoginBox = (props) => {
    const [userInput1, setUserInput1] = useState('');
    const [pwInput1, setPWInput1] = useState('');
    const [verifyUser1, setVerifyUser1] = useState(false);
    const [authFailed1, setAuthFailed1] = useState(false);
    const [authSuccess1, setAuthSuccess1] = useState(false);
    const [guestLogin1, setGuestLogin1] = useState(false);

    const [userInput2, setUserInput2] = useState('');
    const [pwInput2, setPWInput2] = useState('');
    const [verifyUser2, setVerifyUser2] = useState(false);
    const [authFailed2, setAuthFailed2] = useState(false);
    const [authSuccess2, setAuthSuccess2] = useState(false);
    const [guestLogin2, setGuestLogin2] = useState(false);

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

    const getButtons1 = () => {
        if(authSuccess1){
            return (
                <Fragment>
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Box>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={() => {setVerifyUser1(true)}}
                                sx={{mx: 2, my: 1, backgroundColor: '#ff9296',
                                    "&:hover": { backgroundColor: '#ff9296' }}}
                            >Login</Button>
                            <Button
                                disabled={true}
                                variant="contained"
                                size="medium"
                                sx={{mx: 2, my: 1, backgroundColor: '#444444'}}
                            >Guest</Button>
                        </Box>
                            <Button
                                disabled={true}
                                variant="contained"
                                size="medium"
                                sx={{mx: 2, my: 1, backgroundColor: '#444444'}}
                            >Create Account</Button>
                    </Box>
                </Fragment>
            );
        }else if(guestLogin1){
            return (
                <Fragment>
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Box>
                            <Button
                                disabled={true}
                                variant="contained"
                                size="medium"
                                sx={{mx: 2, my: 1, backgroundColor: '#444444'}}
                            >Login</Button>
                            <Button
                                variant="contained"
                                size="medium"
                                sx={{mx: 2, my: 1, backgroundColor: '#ff9296',
                                    "&:hover": { backgroundColor: '#ff9296' }}}
                            >Guest</Button>
                        </Box>
                            <Button
                                disabled={true}
                                variant="contained"
                                size="medium"
                                sx={{mx: 2, my: 1, backgroundColor: '#444444'}}
                            >Create Account</Button>
                    </Box>
                </Fragment>
            );
        }else{
            return (
                <Fragment>
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Box>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={() => {setVerifyUser1(true)}}
                                sx={{mx: 2, my: 1, backgroundColor: '#444444',
                                    "&:hover": { backgroundColor: '#898989' }}}
                            >Login</Button>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={() => {setGuestLogin1(true)}}
                                sx={{mx: 2, my: 1, backgroundColor: '#444444',
                                    "&:hover": { backgroundColor: '#898989' }}}
                            >Guest</Button>
                        </Box>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => {props.setCreateAccount1(true)}}
                            sx={{mx: 2, my: 1, backgroundColor: '#444444',
                                "&:hover": { backgroundColor: '#898989' }}}
                        >Create Account</Button>
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
                        <Box>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={() => {setVerifyUser2(true)}}
                                sx={{mx: 2, my: 1, backgroundColor: '#60cfff',
                                    "&:hover": { backgroundColor: '#60cfff' }}}
                            >Login</Button>
                            <Button
                                disabled={true}
                                variant="contained"
                                size="medium"
                                sx={{mx: 2, my: 1, backgroundColor: '#444444'}}
                            >Guest</Button>
                        </Box>
                        <Button
                            disabled={true}
                            variant="contained"
                            size="medium"
                            sx={{mx: 2, my: 1, backgroundColor: '#444444'}}
                        >Create Account</Button>
                    </Box>
                </Fragment>
            );
        }else if(guestLogin2){
            return (
                <Fragment>
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Box>
                            <Button
                                disabled={true}
                                variant="contained"
                                size="medium"
                                sx={{mx: 2, my: 1, backgroundColor: '#444444'}}
                            >Login</Button>
                            <Button
                                variant="contained"
                                size="medium"
                                sx={{mx: 2, my: 1, backgroundColor: '#60cfff',
                                    "&:hover": { backgroundColor: '#60cfff' }}}
                            >Guest</Button>
                        </Box>
                        <Button
                            disabled={true}
                            variant="contained"
                            size="medium"
                            sx={{mx: 2, my: 1, backgroundColor: '#444444'}}
                        >Create Account</Button>
                    </Box>
                </Fragment>
            );
        }else{
            return (
                <Fragment>
                    <Box display="flex" flexDirection="column" justifyContent="center">
                        <Box>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={() => {setVerifyUser2(true)}}
                                sx={{mx: 2, my: 1, backgroundColor: '#444444',
                                    "&:hover": { backgroundColor: '#898989' }}}
                            >Login</Button>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={() => {setGuestLogin2(true)}}
                                sx={{mx: 2, my: 1, backgroundColor: '#444444',
                                    "&:hover": { backgroundColor: '#898989' }}}
                            >Guest</Button>
                        </Box>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => {props.setCreateAccount2(true)}}
                            sx={{mx: 2, my: 1, backgroundColor: '#444444',
                                "&:hover": { backgroundColor: '#898989' }}}
                        >Create Account</Button>
                    </Box>
                </Fragment>
            );
        }
    }

    useEffect(() => {
        console.log('in useEffect');

        //if(!verifyUser1 && !verifyUser2) return;
        if(guestLogin1) props.setUser1('Guest');
        if(guestLogin2) props.setUser2('Guest');

        if(verifyUser1) {
            if (userInput1.length > 0 && pwInput1.length > 0 &&
                (props.user2 === undefined || props.user2 === 'Guest' || userInput1 !== props.user2.Username)) {
                //props.setUser1('User1');
                //setAuthSuccess1(true);

                const api = new API();
                async function getUser1Info() {
                    console.log('in getUser1Info');
                    api.getUserInfo(userInput1, encrypt(pwInput1))
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

                getUser1Info();
            } else {
                setVerifyUser1(false);
                setAuthFailed1(true);
                setAuthSuccess1(false);
            }
        }

        if(verifyUser2) {
            if (userInput2.length > 0 && pwInput2.length > 0 &&
            (props.user1 === undefined || props.user1 === 'Guest' || userInput2 !== props.user1.Username)) {
                //props.setUser2('User2');
                //setAuthSuccess2(true);

                const api = new API();
                async function getUser2Info() {
                    console.log('in getUser2Info');
                    api.getUserInfo(userInput2, encrypt(pwInput2))
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

                getUser2Info();
            } else {
                setVerifyUser2(false);
                setAuthFailed2(true);
                setAuthSuccess2(false);
            }
        }
    }, [verifyUser1, props.setUser1, userInput1, pwInput1, guestLogin1,
        verifyUser2, props.setUser2, userInput2, pwInput2, guestLogin2]);


    if(props.player === 'Red'){
        return (
            <Fragment>
                <Box sx={{width: 400, height: 400,
                    border:2, borderRadius: '4px',
                    backgroundColor: '#b81e23', mx:5, mt:5}}>
                    <Typography align="center" className="playerText" sx={{fontSize: 35, mt: 1}}>
                        Player 1
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
                        {getButtons1()}
                    </Box>
                </Box>
            </Fragment>
        );
    }else{
        return (
            <Fragment>
                <Box sx={{width: 400, height: 400,
                    border:2, borderRadius: '4px',
                    backgroundColor: '#006692', mx:5, mt:5}}>
                    <Typography align="center" className="playerText" sx={{fontSize: 35, mt: 1}}>
                        Player 2
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
                        {getButtons2()}
                    </Box>
                </Box>
            </Fragment>
        );
    }
}

export default LoginBox;