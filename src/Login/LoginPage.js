import React, {useState, Fragment} from 'react';
import {Box, Grid} from '@mui/material';
import LoginBox from "./LoginBox";
import CreateAccountBox from "./CreateAccountBox";
import logo from '../images/misc/logo.png';
import '../App.css';

export default function LoginPage(props) {
    const [createAccount1, setCreateAccount1] = useState(false);
    const [createAccount2, setCreateAccount2] = useState(false);

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
                    {
                        createAccount1 ? (
                            <CreateAccountBox player={"Red"}
                                              user1={props.user1}
                                              setUser1={props.setUser1}
                                              setCreateAccount1={setCreateAccount1}/>
                        ) : (
                            <LoginBox player={"Red"}
                                      user1={props.user1}
                                      user2={props.user2}
                                      setUser1={props.setUser1}
                                      setCreateAccount1={setCreateAccount1}/>
                        )
                    }
                    {
                        createAccount2 ? (
                            <CreateAccountBox player={"Blue"}
                                              user2={props.user2}
                                              setUser2={props.setUser2}
                                              setCreateAccount2={setCreateAccount2}/>
                        ) : (
                            <LoginBox player={"Blue"}
                                      user1={props.user1}
                                      user2={props.user2}
                                      setUser2={props.setUser2}
                                      setCreateAccount2={setCreateAccount2}/>
                        )
                    }
                </Grid>
            </Box>
        </Fragment>
    );
}