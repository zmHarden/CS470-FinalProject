import './App.css';
import React, {Fragment, useState} from "react";
import {Box, Button, Grid} from "@mui/material";
import TopMessage from "./TopMessage";
import Map from "./Map";
import MapEdit from "./mapEdit"; //Definitions on what tiles differ from the generic all-plains map
import {MapSize} from "./mapEdit"; //Size of map used
import BottomButtons from "./BottomButtons";
import TerrainTypes from "./TerrainTypes";
import UnitTypes from "./UnitTypes";
import pathing from './pathing.js'

let unitOrigin = {x: 0, y: 0}
let unitMove = {x: 0, y: 0}
let moveB = []
let moveConfirmation = false;

const redPlayer = {funds: 2000, properties: 2};
const bluePlayer = {funds: 0, properties: 2};

function App() {

    const [turn, setTurn] = useState("Red");
    const [curPlayer, setCurPlayer] = useState(redPlayer);
    const [movingUnit, setMovingUnit] = useState(false);
    //const [redPlayer, setRedPlayer] = useState(newPlayer());
    //const [bluePlayer, setBluePlayer] = useState(newPlayer());
    const [disableButtons, setDisableButtons] = useState(true)
    const [canFire, setCanFire] = useState(false)
    const [isFiring, setIsFiring] = useState(false)
    const [canCapture, setCanCapture] = useState(false)

    let calcDamProto = [-1, -1, -1, -1, 0]; //Fifth value is defence vs strikeback damage
    const [calcDam, setCalcDam] = useState(calcDamProto);

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

    unitArrayProto[1][2] = getTank("Red");
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

        console.log(`exhausted: ${unitArray[x][y].exhausted}`)
        console.log(`movingUnit: ${movingUnit}`)
        console.log(`moveConfirmation: ${moveConfirmation}`)
        console.log(`isFiring: ${isFiring}`)

        if(mapArray[x][y].owner === turn && unitArray[x][y].type === "noUnit" && !movingUnit && !moveConfirmation && !isFiring){
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
            return
        }

        let hasMoved = false;
        console.log(x + ", " + y);
        if(unitArray[x][y].type === "noUnit" && !movingUnit)
            return
        else if(unitArray[x][y].type !== "noUnit" && unitArray[x][y].owner !== turn) // This is where the check for combat happens
        {
            if(unitArray[x][y].damage !== -1)
            {
                let tempUnitArray = unitArray.slice();
                let tempCalcDam = calcDam.slice();
                tempUnitArray[x][y].health = tempUnitArray[x][y].health-tempUnitArray[x][y].damage

                if(calcDam[0] !== -1)
                {
                    tempUnitArray[unitMove.x-1][unitMove.y].damage = -1;
                    tempCalcDam[0] = -1;
                }
                if(calcDam[1] !== -1)
                {
                    tempUnitArray[unitMove.x+1][unitMove.y].damage = -1;
                    tempCalcDam[1] = -1;
                }
                if(calcDam[2] !== -1)
                {
                    tempUnitArray[unitMove.x][unitMove.y-1].damage = -1;
                    tempCalcDam[2] = -1;
                }
                if(calcDam[3] !== -1)
                {
                    tempUnitArray[unitMove.x][unitMove.y+1].damage = -1;
                    tempCalcDam[3] = -1;
                }

                if (tempUnitArray[x][y].health <= 0)
                {
                    tempUnitArray[x][y] = getBlankUnit();
                }
                else
                {
                    tempUnitArray[unitMove.x][unitMove.y].health = tempUnitArray[unitMove.x][unitMove.y].health -
                        Math.ceil(tempUnitArray[x][y].damageVals[tempUnitArray[unitMove.x][unitMove.y].target].damage *
                        Math.max(0, ((10-calcDam[4])/10)) *
                        tempUnitArray[x][y].health/100);
                    tempCalcDam[4] = 0;
                }
                setUnitArray(tempUnitArray);
                setCalcDam(tempCalcDam);

                setIsFiring(false);
            }
            return
        }

        if(moveConfirmation)
            return


        let tempMapArray = mapArray.slice()
        // tempMapArray[x][y].type = blueSoldier;
        // setMapArray(tempMapArray);
        if(!movingUnit){
            //console.log(!unitArray[x][y].exhausted)
            //console.log(unitArray[x][y].owner === turn)
            if(!unitArray[x][y].exhausted && unitArray[x][y].owner === turn && !isFiring){
                setMovingUnit(true);
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
            //setMovingUnit(true);
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

            setMovingUnit(false);
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

                let tempDam = calcDam.slice();

                if(unitMove.x >= 1 && unitArray[unitMove.x-1][unitMove.y].type !== "noUnit" && unitArray[unitMove.x-1][unitMove.y].owner !== turn)
                {
                    tempDam[0] =
                        Math.ceil(unitArray[unitMove.x][unitMove.y].damageVals[unitArray[unitMove.x-1][unitMove.y].target].damage *
                        Math.max(0, ((10-mapArray[unitMove.x-1][unitMove.y].defense)/10)) *
                        unitArray[unitMove.x][unitMove.y].health/100);
                    setCanFire(true)
                }
                if(unitMove.x < MapSize[0]-1 && unitArray[unitMove.x+1][unitMove.y].type !== "noUnit" && unitArray[unitMove.x+1][unitMove.y].owner !== turn)
                {
                    tempDam[1] =
                        Math.ceil(unitArray[unitMove.x][unitMove.y].damageVals[unitArray[unitMove.x+1][unitMove.y].target].damage *
                        Math.max(0, ((10-mapArray[unitMove.x+1][unitMove.y].defense)/10)) *
                        unitArray[unitMove.x][unitMove.y].health/100);
                    setCanFire(true)
                }
                if(unitMove.y >= 1 && unitArray[unitMove.x][unitMove.y-1].type !== "noUnit" && unitArray[unitMove.x][unitMove.y-1].owner !== turn)
                {
                    tempDam[2] =
                        Math.ceil(unitArray[unitMove.x][unitMove.y].damageVals[unitArray[unitMove.x][unitMove.y-1].target].damage *
                        Math.max(0, ((10-mapArray[unitMove.x][unitMove.y-1].defense)/10)) *
                        unitArray[unitMove.x][unitMove.y].health/100);
                    setCanFire(true)
                }
                if(unitMove.y < MapSize[1]-1 && unitArray[unitMove.x][unitMove.y+1].type !== "noUnit" && unitArray[unitMove.x][unitMove.y+1].owner !== turn)
                {
                    tempDam[3] =
                        Math.ceil(unitArray[unitMove.x][unitMove.y].damageVals[unitArray[unitMove.x][unitMove.y+1].target].damage *
                        Math.max(0, ((10-mapArray[unitMove.x][unitMove.y+1].defense)/10)) *
                        unitArray[unitMove.x][unitMove.y].health/100);
                    setCanFire(true)
                }
                if(canFire)
                {
                    tempDam[4] = mapArray[unitMove.x][unitMove.y].defense;
                }

                setCalcDam(tempDam);
            }
        }
    }

    const confirmMove = () => {
        setDisableButtons(true);
        setCanFire(false);
        unitArray[unitMove.x][unitMove.y].exhausted = true;
        moveConfirmation = false;
    }
    const cancelMove = () => {
        setDisableButtons(true);
        setCanFire(false);
        unitArray[unitOrigin.x][unitOrigin.y] = unitArray[unitMove.x][unitMove.y];
        unitArray[unitMove.x][unitMove.y] = getBlankUnit();
        setUnitArray(unitArray.slice())
        moveConfirmation = false;
    }
    const fireAndMove = () => {

        let tempUnitArray = unitArray.slice();

        if(unitMove.x >= 1 && unitArray[unitMove.x-1][unitMove.y].type !== "noUnit" && unitArray[unitMove.x-1][unitMove.y].owner !== turn)
        {
            tempUnitArray[unitMove.x-1][unitMove.y].damage = calcDam[0]
        }
        if(unitMove.x < MapSize[0]-1 && unitArray[unitMove.x+1][unitMove.y].type !== "noUnit" && unitArray[unitMove.x+1][unitMove.y].owner !== turn)
        {
            tempUnitArray[unitMove.x+1][unitMove.y].damage = calcDam[1]
        }
        if(unitMove.y >= 1 && unitArray[unitMove.x][unitMove.y-1].type !== "noUnit" && unitArray[unitMove.x][unitMove.y-1].owner !== turn)
        {
            tempUnitArray[unitMove.x][unitMove.y-1].damage = [calcDam[2]]
        }
        if(unitMove.y < MapSize[1]-1 && unitArray[unitMove.x][unitMove.y+1].type !== "noUnit" && unitArray[unitMove.x][unitMove.y+1].owner !== turn)
        {
            tempUnitArray[unitMove.x][unitMove.y+1].damage = calcDam[3]
        }

        setUnitArray(tempUnitArray);

        setCanFire(false);
        setIsFiring(true);
        confirmMove();
    }
    const captureAndMove = () => {

        confirmMove();
    }

    const newTurn = () => {
        let tempUnitArray = unitArray.slice();
        setMovingUnit(false);
        //console.log(`Red funds: ${redPlayer.funds}, Blue funds ${bluePlayer.funds}`)

        if(turn === "Red")
        {
            setTurn("Blue");
            //const newBluePlayer = {...bluePlayer, funds: bluePlayer.funds + bluePlayer.properties * 1000};
            //setBluePlayer(newBluePlayer);
            setCurPlayer(bluePlayer);
            bluePlayer.funds = updateFunds("Blue", "New Turn");

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

            for( let i in tempUnitArray)
            {
                for( let j in tempUnitArray[i])
                {
                    if(tempUnitArray[i][j].owner === "Red")
                    {
                        tempUnitArray[i][j].exhausted = false;
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
                <TopMessage whosTurn={turn} redPlayer={redPlayer} bluePlayer={bluePlayer}/>
                <Map mapEdits={MapEdit()}  MAP_HEIGHT={MapSize[0]} MAP_WIDTH={MapSize[1]} unitsArray={unitArray} onClickCallback={mapClick}/>
                ㅤ{/* <-- Blank Character button for spacing */}
                {/*<BottomButtons onClickCallback={newTurn}/>*/}

                <button
                    disabled={!disableButtons || isFiring || movingUnit}
                    style={{cursor: (disableButtons === true ? 'pointer' : '')}}
                    onClick={newTurn}
                >
                    End Turn
                </button>

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

                <button
                    disabled={!canFire}
                    style={{cursor: (canFire === true ? 'pointer' : '')}}
                    onClick={fireAndMove}
                >
                    Fire
                </button>

                <button
                    disabled={!canCapture}
                    style={{cursor: (canCapture === true ? 'pointer' : '')}}
                    onClick={captureAndMove}
                >
                    Capture
                </button>

            </Box>
        </Fragment>
    )
}

export default App;