import React, {useState, useEffect, Fragment} from 'react';
//import API from './API_Interface';
import {TextField, Button, Box, Divider, Grid, Typography} from '@mui/material';
import logo from './images/misc/logo.png';
import './App.css';

export default function Login(props) {
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

    const getButton1 = () => {
        if(authSuccess1){
            return (
                <Fragment>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={() => {setVerifyUser1(true)}}
                        sx={{mx: 2, mt: 1, backgroundColor: '#ff9296',
                            "&:hover": { backgroundColor: '#ff9296' }}}
                    >Login</Button>
                    <Button
                        disabled={true}
                        variant="contained"
                        size="medium"
                        sx={{mx: 2, mt: 1, backgroundColor: '#444444'}}
                    >Guest</Button>
                </Fragment>
            );
        }else if(guestLogin1){
            return (
                <Fragment>
                    <Button
                        disabled={true}
                        variant="contained"
                        size="medium"
                        onClick={() => {setVerifyUser1(true)}}
                        sx={{mx: 2, mt: 1, backgroundColor: '#444444'}}
                    >Login</Button>
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{mx: 2, mt: 1, backgroundColor: '#ff9296',
                            "&:hover": { backgroundColor: '#ff9296' }}}
                    >Guest</Button>
                </Fragment>
            );
        }else{
            return (
                <Fragment>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={() => {setVerifyUser1(true)}}
                        sx={{mx: 2, mt: 1, backgroundColor: '#444444',
                            "&:hover": { backgroundColor: '#898989' }}}
                    >Login</Button>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={() => {setGuestLogin1(true)}}
                        sx={{mx: 2, mt: 1, backgroundColor: '#444444',
                            "&:hover": { backgroundColor: '#898989' }}}
                    >Guest</Button>
                </Fragment>
            );
        }
    }

    const getButton2 = () => {
        if(authSuccess2){
            return (
                <Fragment>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={() => {setVerifyUser2(true)}}
                        sx={{mx: 2, mt: 1, backgroundColor: '#60cfff',
                            "&:hover": { backgroundColor: '#60cfff' }}}
                    >Login</Button>
                    <Button
                        disabled={true}
                        variant="contained"
                        size="medium"
                        sx={{mx: 2, mt: 1, backgroundColor: '#444444'}}
                    >Guest</Button>
                </Fragment>
            );
        }else if(guestLogin2){
            return (
                <Fragment>
                    <Button
                        disabled={true}
                        variant="contained"
                        size="medium"
                        onClick={() => {setVerifyUser2(true)}}
                        sx={{mx: 2, mt: 1, backgroundColor: '#444444'}}
                    >Login</Button>
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{mx: 2, mt: 1, backgroundColor: '#60cfff',
                            "&:hover": { backgroundColor: '#60cfff' }}}
                    >Guest</Button>
                </Fragment>
            );
        }else{
            return (
                <Fragment>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={() => {setVerifyUser2(true)}}
                        sx={{mx: 2, mt: 1, backgroundColor: '#444444',
                            "&:hover": { backgroundColor: '#898989' }}}
                    >Login</Button>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={() => {setGuestLogin2(true)}}
                        sx={{mx: 2, mt: 1, backgroundColor: '#444444',
                            "&:hover": { backgroundColor: '#898989' }}}
                    >Guest</Button>
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
            if (userInput1.length > 0 || pwInput1.length > 0) {
                props.setUser1('User1');
                setAuthSuccess1(true);

                /*const api = new API();
                async function getUser1Info() {
                    console.log('in getUser1Info');
                    api.getUserInfo(userInput1, pwInput1)
                        .then(userInfo => {
                            console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                            const user = userInfo.user;
                            if (userInfo.status === "OK") {
                                props.setUser1(user);
                            } else {
                                setVerifyUser1(false);
                                setAuthFailed1(true);
                            }
                        });
                }

                getUser1Info();*/
            } else {
                setVerifyUser1(false);
                setAuthFailed1(true);
                setAuthSuccess1(false);
            }
        }

        if(verifyUser2) {
            if (userInput2.length > 0 || pwInput2.length > 0) {
                props.setUser2('User2');
                setAuthSuccess2(true);

                /*const api = new API();
                async function getUser2Info() {
                    console.log('in getUser2Info');
                    api.getUserInfo(userInput2, pwInput2)
                        .then(userInfo => {
                            console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                            const user = userInfo.user;
                            if (userInfo.status === "OK") {
                                props.setUser2(user);
                            } else {
                                setVerifyUser2(false);
                                setAuthFailed2(true);
                            }
                        });
                }

                getUser2Info();*/
            } else {
                setVerifyUser2(false);
                setAuthFailed2(true);
                setAuthSuccess2(false);
            }
        }
    }, [verifyUser1, props.setUser1, userInput1, pwInput1, guestLogin1,
        verifyUser2, props.setUser2, userInput2, pwInput2, guestLogin2]);


    return (
        <Fragment >
            <Box className="backgroundPattern"
                 height="100vh"
                 width="100vw"
                 sx={{display:'flex',
                     flexDirection: 'column',
                     alignItems:'center',
                 }}>
                <Box sx={{my: 5}}>
                    <img src={logo} alt={"logo"}/>
                </Box>
                <Grid container columns={2} justifyContent="center">
                    <Box sx={{width: 400, height: 400,
                        border:2, borderRadius: '4px',
                        backgroundColor: '#b81e23', mx:5, mt:5}}>
                        <Typography align="center" className="playerText" sx={{fontSize: 35, mt: 1}}>
                            Player 1
                        </Typography>
                        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                            <TextField
                                variant="filled"
                                error={authFailed1}
                                label="Username"
                                placeholder=""
                                value={userInput1}
                                onChange={handleInputChange1}
                                sx={{my: 1,
                                    width: 250,
                                    backgroundColor: 'white',
                                    borderRadius: '4px',
                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                        "& > fieldset": {
                                            borderColor: "#e600ff"
                                        }
                                    }}}
                            />
                            <Divider />
                        </Box>

                        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                            <TextField
                                variant="filled"
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
                            {getButton1()}
                        </Box>
                    </Box>

                    <Box sx={{width: 400, height: 400,
                        border:2, borderRadius: '4px',
                        backgroundColor: '#006692', mx:5, mt:5}}>
                        <Typography align="center" className="playerText" sx={{fontSize: 35, mt: 1}}>
                            Player 2
                        </Typography>
                        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                            <TextField
                                variant="filled"
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
                            {getButton2()}
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </Fragment>
    );
}