
import React, { useState, Fragment } from 'react';
import Login from './Login';
import App from './App';

const logout = (setUser1, setUser2) => {
    return () => {
        setUser1(undefined);
        setUser2(undefined);
    }
};

export default function Main() {

    const [user1, setUser1] = useState(undefined);
    const [user2, setUser2] = useState(undefined);

    return (
        <Fragment>
            {
                user1 !== undefined && user2 !== undefined ? (
                    <App user1={user1} user2={user2} logoutAction={logout(setUser1, setUser2)}/>
                ) : (
                    <Login user1={user1} setUser1={setUser1}
                           user2={user2} setUser2={setUser2}
                    />
                )
            }
        </Fragment>
    )

}