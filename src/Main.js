
import React, { useState, Fragment } from 'react';
import LoginPage from './Login/LoginPage';
import App from './App';
import MapSelect from './MapSelect';

const logout = (setUser1, setUser2, setMap) => {
    return () => {
        setUser1(undefined);
        setUser2(undefined);
        setMap(-1);
    }
};

export default function Main() {

    const [user1, setUser1] = useState(undefined);
    const [user2, setUser2] = useState(undefined);
    const [map, setMap] = useState(-1);

    // uncomment to skip login page and map select
    // return (
    //     <Fragment>
    //         <App user1={"Guest"} user2={"Guest"} mapNum={0} logoutAction={logout(setUser1, setUser2)}/>
    //     </Fragment>
    // )

    return (
        <Fragment >
            {
                user1 !== undefined && user2 !== undefined ? (
                    map > -1 ? 
                        ( <App user1={user1} user2={user2} mapNum={map} logoutAction={logout(setUser1, setUser2, setMap)}/> ) :
                        ( <MapSelect setMap={setMap}/>)
                ) : (
                    <LoginPage user1={user1} setUser1={setUser1}
                               user2={user2} setUser2={setUser2}
                    />
                )
            }
        </Fragment>
    )

}