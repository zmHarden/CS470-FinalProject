import './App.css';
import React, {Fragment, useState} from "react";
import {Box, Grid} from "@mui/material";
import TopMessage from "./TopMessage";
import Map from "./Map";
import MapEdit from "./mapEdit"; //Definitions on what tiles differ from the generic all-plains map
import {MapSize} from "./mapEdit"; //Size of map used
import BottomButtons from "./BottomButtons";
import TerrainTypes from "./TerrainTypes";
import UnitTypes from "./UnitTypes";
import pathing from './pathing.js'
import {red} from "@mui/material/colors";

let unitOrigin = {x: 0, y: 0}
let unitMove = {x: 0, y: 0}
let movingUnit = false;
let moveB = []
let moveConfirmation = false;

const redPlayer = {funds: 1000, properties: 1};
const bluePlayer = {funds: 0, properties: 1};

function App() {

    const [turn, setTurn] = useState("Red");
    const [curPlayer, setCurPlayer] = useState(redPlayer);
    //const [redPlayer, setRedPlayer] = useState(newPlayer());
    //const [bluePlayer, setBluePlayer] = useState(newPlayer());
    const [disableButtons, setDisableButtons] = useState(true)

    let getBlankUnit = () => {return  {...UnitTypes.noUnit};}
    let getTank = (owner) => {
        if(owner === "Red") return {...UnitTypes.redTank};
        else return {...UnitTypes.blueTank};
    }
    let getSoldier = (owner) => {
        if(owner === "Red") return {...UnitTypes.redSoldier};
        else return {...UnitTypes.blueSoldier};
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
    unitArrayProto[1][2].exhausted = false;
    unitArrayProto[8][13] = getTank("Blue");
    unitArrayProto[8][13].exhausted = true;

    const [unitArray, setUnitArray] = useState(unitArrayProto);

    const unitMenu = (funds) => {
        const units = [];
        if (funds >= 1000) units.push("Soldier");
        if (funds >= 7000) units.push("Tank");

        return (
            <Fragment>

            </Fragment>
        )
    };

    const updateFunds = (turn, transaction) => {
        let player = redPlayer;
        if(turn === "Blue") player = bluePlayer;
        let newFunds = player.funds;

        if(transaction === "New Turn"){
            newFunds = player.funds + player.properties * 1000;
        } else if (transaction === "Soldier"){
            newFunds = player.funds - 1000;
        } else if (transaction === "Tank"){
            newFunds = player.funds - 7000;
        }

        return newFunds
    };

    const mapClick = (x,y, mapArray, setMapArray) => {
        console.log(`Red funds: ${redPlayer.funds}, Blue funds: ${bluePlayer.funds}`)
        //console.log(mapArray[x][y].owner);
        if(mapArray[x][y].owner === turn && unitArray[x][y].type === "noUnit" && !moveConfirmation){
            console.log(`click on ${turn} Factory`)
            if(curPlayer.funds >= 7000) {
                unitArray[x][y] = getTank(turn);
                setUnitArray(unitArray.slice());
                curPlayer.funds = updateFunds(turn, "Tank");
            } else if (curPlayer.funds >= 1000) {
                unitArray[x][y] = getSoldier(turn);
                setUnitArray(unitArray.slice());
                curPlayer.funds = updateFunds(turn, "Soldier");
            }
        }

        if(moveConfirmation)
            return

        let hasMoved = false;
        console.log(x + ", " + y);
        if(unitArray[x][y].type === "noUnit" && !movingUnit)
            return
        else if(unitArray[x][y].type !== "noUnit" && unitArray[x][y].owner !== turn)
            return

        let tempMapArray = mapArray.slice()
        // tempMapArray[x][y].type = blueSoldier;
        // setMapArray(tempMapArray);
        if(!movingUnit){
            //console.log(!unitArray[x][y].exhausted)
            //console.log(unitArray[x][y].owner === turn)
            if(!unitArray[x][y].exhausted && unitArray[x][y].owner === turn){
                moveB = pathing(unitArray, mapArray, x, y)
                console.log("------------------------------")
                for(let i in moveB){
                    let curR = moveB[i].row;
                    let curC = moveB[i].col;
                    // console.log(moveB[i].row, moveB[i].col)
                    // console.log(mapArray[curR][curC].type)
                    if(mapArray[curR][curC].type === "plain")
                        tempMapArray[curR][curC] = TerrainTypes.highPlain;

                    else if(mapArray[curR][curC].type === "redFactory")
                        tempMapArray[curR][curC] = TerrainTypes.highRedFactory;

                    else if(mapArray[curR][curC].type === "redHQ")
                        tempMapArray[curR][curC] = TerrainTypes.highRedHQ;

                    else if(mapArray[curR][curC].type === "blueHQ")
                        tempMapArray[curR][curC] = TerrainTypes.highBlueHQ;

                    else if(mapArray[curR][curC].type === "blueFactory")
                        tempMapArray[curR][curC] = TerrainTypes.highBlueFactory;

                    else if(mapArray[curR][curC].type === "neutralFactory")
                        tempMapArray[curR][curC] = TerrainTypes.highNeutralFactory;

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
                    if(mapArray[curR][curC].type === "highPlain")
                        tempMapArray[curR][curC] = TerrainTypes.plain;

                    else if(mapArray[curR][curC].type === "highRedFactory")
                        tempMapArray[curR][curC] = TerrainTypes.redFactory;

                    else if(mapArray[curR][curC].type === "highRedHQ")
                        tempMapArray[curR][curC] = TerrainTypes.redHQ;

                    else if(mapArray[curR][curC].type === "highBlueHQ")
                        tempMapArray[curR][curC] = TerrainTypes.blueHQ;

                    else if(mapArray[curR][curC].type === "highBlueFactory")
                        tempMapArray[curR][curC] = TerrainTypes.blueFactory;

                    else if(mapArray[curR][curC].type === "highNeutralFactory")
                        tempMapArray[curR][curC] = TerrainTypes.neutralFactory;

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
        unitArray[unitMove.x][unitMove.y].exhausted = true;
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
        movingUnit = false;
        //console.log(`Red funds: ${redPlayer.funds}, Blue funds ${bluePlayer.funds}`)

        if(turn === "Red")
        {
            setTurn("Blue");
            //const newBluePlayer = {...bluePlayer, funds: bluePlayer.funds + bluePlayer.properties * 1000};
            //setBluePlayer(newBluePlayer);
            setCurPlayer(bluePlayer);
            bluePlayer.funds = updateFunds("Blue", "New Turn");
            console.log(`Blue funds: ${bluePlayer.funds}`);
            for( let i in tempUnitArray)
            {
                for( let j in tempUnitArray[i])
                {
                    if(tempUnitArray[i][j].owner === "Blue")
                    {
                        tempUnitArray[i][j].exhausted = false;
                    }
                }
            }
        }
        else
        {
            setTurn("Red");
            //const newRedPlayer = {...redPlayer, funds: redPlayer.funds + redPlayer.properties * 1000};
            //setRedPlayer(newRedPlayer);
            setCurPlayer(redPlayer);
            redPlayer.funds = updateFunds("Red", "New Turn");
            console.log(`Red funds: ${redPlayer.funds}`);
            for( let i in tempUnitArray)
            {
                for( let j in tempUnitArray[i])
                {
                    if(tempUnitArray[i][j].owner === "Red")
                    {
                        console.log(tempUnitArray[i][j].exhausted)
                        tempUnitArray[i][j].exhausted = false;
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