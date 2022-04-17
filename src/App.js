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

import plain from './images/terrain/tile_grass_64.png'
import highPlain from './images/terrain/tile_grass_highlight.png'

import redFactory from './images/terrain/FactoryRed.png'
import highRedFactory from './images/terrain/FactoryRedHighlight.png'

import redHQ from './images/terrain/HQred.png'
import highRedHQ from './images/terrain/HQredHighlight.png'

import blueHQ from './images/terrain/HQblue.png'
import highBlueHQ from './images/terrain/HighHQblue.png'

import blueFactory from './images/terrain/FactoryBlue.png'
import highBlueFactory from './images/terrain/HighFactoryBlue.png'

import pathing from './pathing.js'

let unitOrigin = {x: 0, y: 0}
let unitMove = {x: 0, y: 0}
let movingUnit = false;
let moveB = []
let moveConfirmation = false;

function App() {

    const [turn, setTurn] = useState("Red");
    const [disableButtons, setDisableButtons] = useState(true)

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
            return {type:blueTank, target:"tank", owner:"Blue", health:100, movementType:"Treads", movespeed:6, exhausted:"yes",
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
            return {type:redSoldier, target:"soldier", owner:"Red", health:100, movementType:"Foot", movespeed:3, exhausted:"yes",
                damageVals:[
                    {target: "soldier", damage: 55},
                    {target: "tank", damage: 5}
                ]
            };
        }
        else
        {
            return {type:blueSoldier, target:"soldier", owner:"Blue", health:100, movementType:"Foot", movespeed:3, exhausted:"yes",
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
    unitArrayProto[1][2].exhausted = "no";

    const [unitArray, setUnitArray] = useState(unitArrayProto);

    const mapClick = (x,y, mapArray, setMapArray) => {
        if(moveConfirmation)
            return

        let hasMoved = false;
        console.log(x + ", " + y);
        if(unitArray[x][y].type === noUnit && !movingUnit)
            return
        else if(unitArray[x][y].type !== noUnit && unitArray[x][y].owner !== turn)
            return

        let tempMapArray = mapArray.slice()
        // tempMapArray[x][y].type = blueSoldier;
        // setMapArray(tempMapArray);
        if(!movingUnit){
            if(unitArray[x][y].exhausted === "no" && unitArray[x][y].owner === turn){
                moveB = pathing(unitArray, mapArray, x, y)
                console.log("------------------------------")
                for(let i in moveB){
                    let curR = moveB[i].row;
                    let curC = moveB[i].col;
                    // console.log(moveB[i].row, moveB[i].col)
                    // console.log(mapArray[curR][curC].type)
                    if(mapArray[curR][curC].type === plain)
                        tempMapArray[curR][curC].type = highPlain; 
                    
                    else if(mapArray[curR][curC].type === redFactory)
                        tempMapArray[curR][curC].type = highRedFactory; 
                    
                    else if(mapArray[curR][curC].type === redHQ)
                        tempMapArray[curR][curC].type = highRedHQ; 

                    else if(mapArray[curR][curC].type === blueHQ)
                        tempMapArray[curR][curC].type = highBlueHQ; 

                    else if(mapArray[curR][curC].type === blueFactory)
                        tempMapArray[curR][curC].type = highBlueFactory; 

                    tempMapArray[curR][curC].movable = true;
                }
                setMapArray(tempMapArray)
            }
            movingUnit = true;
            unitOrigin.x = x;
            unitOrigin.y = y;
            return
        }
        else{
            if(mapArray[x][y].movable === false)
                return
            hasMoved = true;
            console.log(unitOrigin)
            if(x !== unitOrigin.x || y !== unitOrigin.y){
                unitArray[x][y] = unitArray[unitOrigin.x][unitOrigin.y]
                unitArray[unitOrigin.x][unitOrigin.y] = getBlankUnit();
                setUnitArray(unitArray.slice())

                unitMove.x = x;
                unitMove.y = y;
            }
            else{
                hasMoved = false;
                setUnitArray(unitArray.slice())
            }
            
            movingUnit = false;
            for(let i in moveB){
                let curR = moveB[i].row;
                    let curC = moveB[i].col;
                    // console.log(moveB[i].row, moveB[i].col)
                    // console.log(mapArray[curR][curC].type)
                    if(mapArray[curR][curC].type === highPlain)
                        tempMapArray[curR][curC].type = plain; 
                
                    else if(mapArray[curR][curC].type === highRedFactory)
                        tempMapArray[curR][curC].type = redFactory; 
                    
                    else if(mapArray[curR][curC].type === highRedHQ)
                        tempMapArray[curR][curC].type = redHQ; 
                    
                    else if(mapArray[curR][curC].type === highBlueHQ)
                        tempMapArray[curR][curC].type = blueHQ; 
                    
                    else if(mapArray[curR][curC].type === highBlueFactory)
                        tempMapArray[curR][curC].type = blueFactory; 
                    
                    tempMapArray[curR][curC].movable = false;
            }
            if(hasMoved){
                moveConfirmation = true;
                setDisableButtons(false)
            }
        }
    }

    const confirmMove = () => {
        setDisableButtons(true); 
        unitArray[unitMove.x][unitMove.y].exhausted = "yes"
        moveConfirmation = false;
    }
    const cancelMove = () => {
        setDisableButtons(true); 
        unitArray[unitOrigin.x][unitOrigin.y] = unitArray[unitMove.x][unitMove.y];
        unitArray[unitMove.x][unitMove.y] = getBlankUnit();
        setUnitArray(unitArray.slice())
        moveConfirmation = false;
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
                    if(tempUnitArray[i][j].owner === "Red")
                    {
                        console.log(tempUnitArray[i][j].exhausted)
                        tempUnitArray[i][j].exhausted = "no";
                        console.log(tempUnitArray[i][j].exhausted)
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
            
                <button 
                    disabled={disableButtons}
                    style={{cursor: (disableButtons === false ? 'pointer' : '')}}
                    onClick={confirmMove}
                >
                Confirm Move
                </button>

                <button 
                    disabled={disableButtons}
                    style={{cursor: (disableButtons === false ? 'pointer' : '')}}
                    onClick={cancelMove}
                >
                Cancel Move
                </button>
            
            </Box>
        </Fragment>
    )
}

export default App;