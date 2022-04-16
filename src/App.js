import './App.css';
import React, {Fragment, useState} from "react";
import {Box, Grid} from "@mui/material";
import TopMessage from "./TopMessage";
import Map from "./Map";
import MapEdit from "./mapEdit"; //Definitions on what tiles differ from the generic all-plains map
import {MapSize} from "./mapEdit"; //Size of map used
import BottomButtons from "./BottomButtons";
import noUnit from './images/units/noUnit.png'
import redTank from './images/units/tankRed.png'
import blueTank from './images/units/tankBlue.png'
import redSoldier from './images/units/soldierRed.png'
import blueSoldier from './images/units/soldierBlue.png'

function App() {

    const [turn, setTurn] = useState("Red");

    let getBlankUnit = () => {
        return  {type:noUnit, target:"", owner:"", health:100, movementType:"", movespeed:0, exhausted:"yes", damageVals:[] };
    }
    let getTank = (owner) => {
        if(owner === "Red")
        {
            return {type:redTank, target:"tank", owner:"Red", health:100, movementType:"Treads", movespeed:6, exhausted:"yes",
                damageVals:[
                    {target: "soldier", damage: 75},
                    {target: "tank", damage: 55}
                ]
            };
        }
        else
        {
            return {type:"blueTank", target:"tank", owner:"Blue", health:100, movementType:"Treads", movespeed:6, exhausted:"yes",
                damageVals:[
                    {target: "soldier", damage: 75},
                    {target: "tank", damage: 55}
                ]
            };
        }
    }
    let getSoldier = (owner) => {
        if(owner === "Red")
        {
            return {type:"redSoldier", target:"soldier", owner:"Red", health:100, movementType:"Foot", movespeed:3, exhausted:"yes",
                damageVals:[
                    {target: "soldier", damage: 55},
                    {target: "tank", damage: 5}
                ]
            };
        }
        else
        {
            return {type:"blueSoldier", target:"soldier", owner:"Blue", health:100, movementType:"Foot", movespeed:3, exhausted:"yes",
                damageVals:[
                    {target: "soldier", damage: 55},
                    {target: "tank", damage: 5}
                ]
            };
        }
    }

    const unitArrayProto = [];
    for(let i = 0; i < MapSize[0]; i++)
    {
        let tempArray = [];
        for(let j = 0; j < MapSize[1]; j++)
        {
            tempArray.push(getBlankUnit());
        }
        unitArrayProto.push(tempArray);
    }

    unitArrayProto[1][2] = getTank(turn);

    const [unitArray, setUnitArray] = useState(unitArrayProto);

    const mapClick = (x,y, mapArray, setMapArray) => {
        console.log(x + ", " + y);

        let tempMapArray = mapArray.slice()
        tempMapArray[x][y].type = blueSoldier;
        setMapArray(tempMapArray);
    }

    const newTurn = () => {
        let tempUnitArray = unitArray.slice();

        if(turn === "Red")
        {
            setTurn("Blue");
            for( let i in tempUnitArray)
            {
                for( let j in tempUnitArray[i])
                {
                    if(tempUnitArray[i][j].owner === "Blue")
                    {
                        tempUnitArray[i][j].exhausted = "no";
                    }
                }
            }
        }
        else
        {
            setTurn("Red");
            for( let i in tempUnitArray)
            {
                for( let j in tempUnitArray[i])
                {
                    if(tempUnitArray[i][j].owner === "Blue")
                    {
                        tempUnitArray[i][j].exhausted = "no";
                    }
                }
            }
        }

        setUnitArray(tempUnitArray);
    }

    return (
        <Fragment>
            <Box margin='auto'
                 sx={{
                     height: 640,
                     width: 1024,
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                 }}
            >
                <TopMessage whosTurn={turn}/>
                <Map mapEdits={MapEdit()}  MAP_HEIGHT={MapSize[0]} MAP_WIDTH={MapSize[1]} unitsArray={unitArray} onClickCallback={mapClick}/>
                <BottomButtons onClickCallback={newTurn}/>
            </Box>
        </Fragment>
    )
}

export default App;
