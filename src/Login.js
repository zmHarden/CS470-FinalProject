import React, {useState, useEffect, Fragment} from 'react';
//import API from './API_Interface/API_Interface';
import {TextField, Button, Box, Divider, Grid, Typography} from '@mui/material'
import logo from './images/misc/logo2.png'

// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';


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
                        color="success"
                        variant="outlined"
                        size="medium"
                        onClick={() => {setVerifyUser1(true)}}
                    >Login</Button>
                    <Button
                        disabled={true}
                        variant="outlined"
                        size="medium"
                    >Guest</Button>
                </Fragment>
            );
        }else if(guestLogin1){
            return (
                <Fragment>
                    <Button
                        disabled={true}
                        variant="outlined"
                        size="medium"
                        onClick={() => {setVerifyUser1(true)}}
                    >Login</Button>
                    <Button
                        color="success"
                        variant="outlined"
                        size="medium"
                    >Guest</Button>
                </Fragment>
            );
        }else{
            return (
                <Fragment>
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => {setVerifyUser1(true)}}
                    >Login</Button>
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => {setGuestLogin1(true)}}
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
                        color="success"
                        variant="outlined"
                        size="medium"
                        onClick={() => {setVerifyUser2(true)}}
                    >Login</Button>
                    <Button
                        disabled={true}
                        variant="outlined"
                        size="medium"
                    >Guest</Button>
                </Fragment>
            );
        }else if(guestLogin2){
            return (
                <Fragment>
                    <Button
                        disabled={true}
                        variant="outlined"
                        size="medium"
                        onClick={() => {setVerifyUser2(true)}}
                    >Login</Button>
                    <Button
                        color="success"
                        variant="outlined"
                        size="medium"
                    >Guest</Button>
                </Fragment>
            );
        }else{
            return (
                <Fragment>
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => {setVerifyUser2(true)}}
                    >Login</Button>
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => {setGuestLogin2(true)}}
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

                /*
                const api = new API();
                async function getUser1Info() {
                    console.log('in getUserInfo');
                    api.getUserInfo(userInput)
                        .then(userInfo => {
                            console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                            const user = userInfo.user;
                            if (userInfo.status === "OK") {
                                setUser(user);
                            } else {
                                setVerifyUser(false);
                                setAuthFailed(true);
                            }
                        });
                }

                getUser1Info();
                */
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

                /*
                const api = new API();
                async function getUser2Info() {
                    console.log('in getUserInfo');
                    api.getUserInfo(userInput)
                        .then(userInfo => {
                            console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                            const user = userInfo.user;
                            if (userInfo.status === "OK") {
                                setUser(user);
                            } else {
                                setVerifyUser(false);
                                setAuthFailed(true);
                            }
                        });
                }

                getUser2Info();
                */
            } else {
                setVerifyUser2(false);
                setAuthFailed2(true);
                setAuthSuccess2(false);
            }
        }
    }, [verifyUser1, props.setUser1, userInput1, pwInput1, guestLogin1,
        verifyUser2, props.setUser2, userInput2, pwInput2, guestLogin2]);


    return (
        <Fragment>
            <Box sx={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
                <img src={logo} alt={"logo"}/>
                <Grid container columns={2} justifyContent="center">
                    <Box sx={{mx:5, mt:5}}>
                        <Typography>Player 1</Typography>
                        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                            <TextField
                                error={authFailed1}
                                label="Username"
                                placeholder=""
                                value={userInput1}
                                onChange={handleInputChange1}
                            />
                            <Divider />
                        </Box>

                        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                            <TextField
                                error={authFailed1}
                                label="Password"
                                type="password"
                                placeholder=""
                                value={pwInput1}
                                onChange={handlePWChange1}
                            />
                            <Divider />
                        </Box>

                        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                            {getButton1()}
                        </Box>
                    </Box>

                    <Box sx={{mx:5, mt:5}}>
                        <Typography>Player 2</Typography>
                        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                            <TextField
                                error={authFailed2}
                                label="Username"
                                placeholder=""
                                value={userInput2}
                                onChange={handleInputChange2}
                            />
                            <Divider />
                        </Box>

                        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>

                            <TextField
                                error={authFailed2}
                                label="Password"
                                type="password"
                                placeholder=""
                                value={pwInput2}
                                onChange={handlePWChange2}
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