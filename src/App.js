import './App.css';
import React, {Fragment, useEffect, useRef, useState} from "react";
import {Box, Button, Popover, Typography} from "@mui/material";
import TopMessage from "./TopMessage";
import PlayerBox from "./PlayerBox";
import StatBox from "./StatBox";
import Map from "./Map";
import MapEdit from "./mapEdit"; //Definitions on what tiles differ from the generic all-plains map
import {MapSize} from "./mapEdit"; //Size of map used
import {PlayerDefaults} from "./mapEdit";
import PopupButtons from "./PopupButtons";
import TerrainTypes from "./TerrainTypes";
import UnitTypes from "./UnitTypes";
import API from "./API_Interface";
import {pathing, rangeFinder} from './pathing.js'
import noUnit from "./images/units/noUnit.png";
import redVictory from "./images/misc/redVictory.png";
import blueVictory from "./images/misc/blueVictory.png";

let unitOrigin = {x: 0, y: 0}
let unitMove = {x: 0, y: 0}
let moveB = []
let distAttk = []
let moveConfirmation = false;

function App(props) {

    const mapNum = props.mapNum;
    const startStats = PlayerDefaults[mapNum];

    const [redPlayer, setRedPlayer] = useState({user: props.user1, funds: startStats[0].funds, properties: startStats[0].properties, units: 0,
        stats: {GamesPlayed: 0, Wins: 0, UnitsDestroyed: 0, UnitsLost: 0, PropertiesCaptured: 0, DamageDealt: 0}});
    const [bluePlayer, setBluePlayer] = useState({user: props.user2, funds: 0, properties: startStats[1].properties, units: 0,
        stats: {GamesPlayed: 0, Wins: 0, UnitsDestroyed: 0, UnitsLost: 0, PropertiesCaptured: 0, DamageDealt: 0}});
    const [victory, setVictory] = useState("");
    const [turn, setTurn] = useState("Red");
    const [curPlayer, setCurPlayer] = useState(redPlayer);
    const [movingUnit, setMovingUnit] = useState(false);
    const [disableButtons, setDisableButtons] = useState(true)
    const [canFire, setCanFire] = useState(false)
    const [isFiring, setIsFiring] = useState(false)
    const [canCapture, setCanCapture] = useState(false)
    const [open, setOpen] = useState(false);
    const [popPosition, setPopPosition] = useState([0, 0]); //X,Y for position on map relative to screen
    const [clickedPosition, setClickedPosition] = useState([0, 0]); //X,Y for position on map relative to grid
    const [mouseEvent, setMouseEvent] = useState(null);
    const [popup, setPopup] = useState(null);
    const [day, setDay] = useState(1)

    const mapArrayProto = [];
    const height = MapSize[mapNum][0]
    const width = MapSize[mapNum][1]

    let redUsername = 'Player 1';
    if(redPlayer.user !== 'Guest') redUsername = redPlayer.user.Username;
    let blueUsername = 'Player 2';
    if(bluePlayer.user !== 'Guest') blueUsername = bluePlayer.user.Username;

    for(let i = 0; i < height; i++){
        let tempArray = [];
        for(let j = 0; j < width; j++){
            tempArray.push({...TerrainTypes.plain})
        }
        mapArrayProto.push(tempArray);
    }
    const holder = [...MapEdit()];
    const mapEdit = [...holder[mapNum]];

    while(mapEdit.length > 0){
        let bloc = mapEdit.shift();
        mapArrayProto[bloc.Row][bloc.Column] = {...bloc};
    }
    const [mapArray, setMapArray] = useState(mapArrayProto);

    let calcDamProto = [-1, -1, -1, -1];
    const [calcDam, setCalcDam] = useState(calcDamProto);

    let getBlankUnit = () => {return  {...UnitTypes.noUnit};}
    let getSoldier = (owner) => {
        if(owner === "Red") {redPlayer.units++; return {...UnitTypes.redSoldier}}
        else { bluePlayer.units++; return {...UnitTypes.blueSoldier}}
    }
    let getMech = (owner) => {
        if(owner === "Red") {redPlayer.units++; return {...UnitTypes.redMech}}
        else { bluePlayer.units++; return {...UnitTypes.blueMech}}
    }
    let getRecon = (owner) => {
        if(owner === "Red") {redPlayer.units++; return {...UnitTypes.redRecon}}
        else { bluePlayer.units++; return {...UnitTypes.blueRecon}}
    }
    let getTank = (owner) => {
        if(owner === "Red") {redPlayer.units++; return {...UnitTypes.redTank}}
        else {bluePlayer.units++; return {...UnitTypes.blueTank}}
    }
    let getMedTank = (owner) => {
        if(owner === "Red") {redPlayer.units++; return {...UnitTypes.redMedTank}}
        else { bluePlayer.units++; return {...UnitTypes.blueMedTank}}
    }

    let getArtillery = (owner) => {
        // return owner === "Red" ? {...UnitTypes.redArtillery} : {...UnitTypes.blueArtillery}
        if(owner === "Red") {redPlayer.units++; return {...UnitTypes.redArtillery}}
        bluePlayer.units++; return {...UnitTypes.blueArtillery}
    }

    const unitArrayProto = [];
    for(let i = 0; i < height; i++)
    {
        let tempArray = [];
        for(let j = 0; j < width; j++)
        {
            tempArray.push(getBlankUnit());
        }
        unitArrayProto.push(tempArray);
    }

    const [unitArray, setUnitArray] = useState(unitArrayProto);

    const updateFunds = (turn, transaction) => {
        let player = redPlayer;
        if(turn === "Blue") player = bluePlayer;
        let newFunds = player.funds;

        if(transaction === "New Turn"){
            newFunds = player.funds + player.properties * 1000;
        } else if (transaction === "soldier"){
            newFunds = player.funds - 1000;
        } else if (transaction === "mech"){
            newFunds = player.funds - 3000;
        } else if (transaction === "recon"){
            newFunds = player.funds - 4000;
        } else if (transaction === "tank"){
            newFunds = player.funds - 7000;
        } else if (transaction === "medTank"){
            newFunds = player.funds - 12000;
        } else if (transaction === "artillery"){
            newFunds = player.funds - 6000
        }

        return newFunds
    };

    const mapClick = (x,y, event) => {

        console.log(`exhausted: ${unitArray[x][y].exhausted}`)
        console.log(`movingUnit: ${movingUnit}`)
        console.log(`moveConfirmation: ${moveConfirmation}`)
        console.log(`isFiring: ${isFiring}`)
        setMouseEvent(event);

        if(mapArray[x][y].owner === turn && mapArray[x][y].building === "factory" && unitArray[x][y].type === "noUnit" && !movingUnit && !moveConfirmation && !isFiring){
            setClickedPosition([x, y] );
            return
        }

        // let hasMoved = false;
        console.log(x + ", " + y);
        if(unitArray[x][y].type === "noUnit" && !movingUnit)
            return
        else if(unitArray[x][y].type !== "noUnit" && unitArray[x][y].owner !== turn) // This is where the check for combat happens
        {
            if(unitArray[x][y].damage !== -1)
            {
                let tempUnitArray = unitArray.slice();
                let tempCalcDam = calcDam.slice();
                tempUnitArray[x][y].health = tempUnitArray[x][y].health-( tempUnitArray[x][y].damage )

                if(turn === "Red") redPlayer.stats.DamageDealt += tempUnitArray[x][y].damage
                else bluePlayer.stats.DamageDealt += tempUnitArray[x][y].damage

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
                    let tempMapArray = mapArray.slice();
                    tempMapArray[x][y].health = 200;
                    setMapArray(tempMapArray);
                    tempUnitArray[x][y] = getBlankUnit();
                    if(turn === "Red")
                    {
                        bluePlayer.units--;
                        redPlayer.stats.UnitsDestroyed++;
                        bluePlayer.stats.UnitsLost++;
                        if(bluePlayer.units === 0) {setVictory("Red")/*Red Victory*/}
                    }
                    else
                    {
                        redPlayer.units--;
                        redPlayer.stats.UnitsLost++;
                        bluePlayer.stats.UnitsDestroyed++;
                        if(redPlayer.units === 0) {setVictory("Blue")/*Blue Victory*/}
                    }
                }
                else if (unitArray[unitOrigin.x][unitOrigin.y].type !== "artillery")
                {
                    let damage = Math.ceil(tempUnitArray[x][y].damageVals[tempUnitArray[unitMove.x][unitMove.y].type] *
                        Math.max(0, ((10-mapArray[unitMove.x][unitMove.y].defense)/10)) *
                        tempUnitArray[x][y].health/100);
                    tempUnitArray[unitMove.x][unitMove.y].health = tempUnitArray[unitMove.x][unitMove.y].health - damage;

                    if(turn === "Red") bluePlayer.stats.DamageDealt += damage
                    else redPlayer.stats.DamageDealt += damage

                    if (tempUnitArray[unitMove.x][unitMove.y].health <= 0)
                    {
                        tempUnitArray[unitMove.x][unitMove.y] = getBlankUnit();
                        if(turn === "Red")
                        {
                            redPlayer.units--;
                            redPlayer.stats.UnitsLost++;
                            bluePlayer.stats.UnitsDestroyed++;
                            if(redPlayer.units === 0) {setVictory("Blue")/*Blue Victory*/}
                        }
                        else
                        {
                            bluePlayer.units--;
                            redPlayer.stats.UnitsDestroyed++;
                            bluePlayer.stats.UnitsLost++;
                            if(bluePlayer.units === 0) {setVictory("Red")/*Red Victory*/}
                        }
                    }
                }

                for(let j in distAttk){ unitArray[distAttk[j].row][distAttk[j].col].damage = -1 }

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
                moveB = pathing(unitArray, mapArray, x, y, height, width)
                console.log("------------------------------")
                for(let i in moveB){
                    let curR = moveB[i].row;
                    let curC = moveB[i].col;
                    tempMapArray[curR][curC].highlight = "withHighlight";
                    if(unitArray[curR][curC].type === "noUnit") 
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
            if(mapArray[x][y].movable === false && ((x !== unitOrigin.x) || (y !== unitOrigin.y)) )
                return
            // hasMoved = true;
            console.log(unitOrigin)
            unitArray[x][y] = unitArray[unitOrigin.x][unitOrigin.y]
            if(x !== unitOrigin.x || y !== unitOrigin.y)
                unitArray[unitOrigin.x][unitOrigin.y] = getBlankUnit();
            
            setUnitArray(unitArray.slice())

            unitMove.x = x;
            unitMove.y = y;

            // console.log(`Went here`)
            // console.log(`UnitOrigin : ${unitOrigin.x}, ${unitOrigin.y}\n UnitMove: ${unitMove.x}, ${unitMove.y}`)
            if(unitOrigin.x === unitMove.x && unitOrigin.y === unitMove.y){
                // console.log(`Got here ${unitArray[x][y].type}`)
                if(unitArray[x][y].type === "artillery"){
                    console.log(`Artillery Detected`)
                    distAttk = rangeFinder(unitArray, x, y, height, width)
                    // console.log(distAttk)
                    // for(let j in distAttk){
                    //     unitArray[distAttk[j].row][distAttk[j].col].damage = 1
                    //     setCanFire(true);
                    // }
                }
            }

            // }
            // else{
            //     hasMoved = false;
            //     setUnitArray(unitArray.slice())
            // }

            setMovingUnit(false);
            for(let i in moveB){
                let curR = moveB[i].row;
                    let curC = moveB[i].col;
                    tempMapArray[curR][curC].highlight = "noHighlight";
                    tempMapArray[curR][curC].movable = false;
            }
            setMapArray(tempMapArray);
            // if(hasMoved){
            moveConfirmation = true;
            setDisableButtons(false)
            setClickedPosition([x, y] );

            let tempDam = calcDam.slice();
            // Artillery Checque
            if(unitArray[x][y].type === "artillery"){
                if(unitOrigin.x === x && unitOrigin.y === y){ if(distAttk.length !== 0) setCanFire(true); }
            }
            else{
                if(unitMove.x >= 1 && unitArray[unitMove.x-1][unitMove.y].type !== "noUnit" && unitArray[unitMove.x-1][unitMove.y].owner !== turn)
                {
                    tempDam[0] =
                        Math.ceil(unitArray[unitMove.x][unitMove.y].damageVals[unitArray[unitMove.x-1][unitMove.y].type] *
                        Math.max(0, ((10-mapArray[unitMove.x-1][unitMove.y].defense)/10)) *
                        unitArray[unitMove.x][unitMove.y].health/100);
                    setCanFire(true)
                }
                if(unitMove.x < height-1 && unitArray[unitMove.x+1][unitMove.y].type !== "noUnit" && unitArray[unitMove.x+1][unitMove.y].owner !== turn)
                {
                    tempDam[1] =
                        Math.ceil(unitArray[unitMove.x][unitMove.y].damageVals[unitArray[unitMove.x+1][unitMove.y].type] *
                        Math.max(0, ((10-mapArray[unitMove.x+1][unitMove.y].defense)/10)) *
                        unitArray[unitMove.x][unitMove.y].health/100);
                    setCanFire(true)
                }
                if(unitMove.y >= 1 && unitArray[unitMove.x][unitMove.y-1].type !== "noUnit" && unitArray[unitMove.x][unitMove.y-1].owner !== turn)
                {
                    tempDam[2] =
                        Math.ceil(unitArray[unitMove.x][unitMove.y].damageVals[unitArray[unitMove.x][unitMove.y-1].type] *
                        Math.max(0, ((10-mapArray[unitMove.x][unitMove.y-1].defense)/10)) *
                        unitArray[unitMove.x][unitMove.y].health/100);
                    setCanFire(true)
                }
                if(unitMove.y < width-1 && unitArray[unitMove.x][unitMove.y+1].type !== "noUnit" && unitArray[unitMove.x][unitMove.y+1].owner !== turn)
                {
                    tempDam[3] =
                        Math.ceil(unitArray[unitMove.x][unitMove.y].damageVals[unitArray[unitMove.x][unitMove.y+1].type] *
                        Math.max(0, ((10-mapArray[unitMove.x][unitMove.y+1].defense)/10)) *
                        unitArray[unitMove.x][unitMove.y].health/100);
                    setCanFire(true)
                }
                setCalcDam(tempDam);
            }


            if(mapArray[unitMove.x][unitMove.y].capturable === true && mapArray[unitMove.x][unitMove.y].owner !== turn && ( unitArray[unitMove.x][unitMove.y].movementType === "foot" || unitArray[unitMove.x][unitMove.y].movementType === "mech") )
            {
                setCanCapture(true);
            }
            // }
        }
    }

    const confirmMove = () => {
        if(unitOrigin.x !== unitMove.x || unitOrigin.y !== unitMove.y)
        {
            let tempMapArray = mapArray.slice();
            tempMapArray[unitOrigin.x][unitOrigin.y].health = 200;
            setMapArray(tempMapArray);
        }
        // if(unitOrigin.x === unitMove.x && unitOrigin.y === unitMove.y){
        //     if(unitArray[unitOrigin.x][unitOrigin.y].type === "artillery"){
        //         console.log(`Artillery Detected.`)
        //     }
        // }
        setDisableButtons(true);
        setCanFire(false);
        setCanCapture(false);
        unitArray[unitMove.x][unitMove.y].exhausted = true;
        moveConfirmation = false;
        closePopupMenu();
    }
    const cancelMove = () => {
        setDisableButtons(true);
        setCanCapture(false);
        setCanFire(false);
        let arrayTemp = unitArray[unitMove.x][unitMove.y]
        // unitArray[unitOrigin.x][unitOrigin.y] = unitArray[unitMove.x][unitMove.y];
        unitArray[unitMove.x][unitMove.y] = getBlankUnit();
        unitArray[unitOrigin.x][unitOrigin.y] = arrayTemp
        setUnitArray(unitArray.slice())
        moveConfirmation = false;
        closePopupMenu();
    }
    const fireAndMove = () => {

        let tempUnitArray = unitArray.slice();

        if(unitMove.x === unitOrigin.x && unitMove.y === unitOrigin.y && unitArray[unitOrigin.x][unitOrigin.y].type === "artillery"){
            for(let j in distAttk){
                unitArray[distAttk[j].row][distAttk[j].col].damage = ( 
                    Math.ceil(unitArray[unitMove.x][unitMove.y].damageVals[unitArray[distAttk[j].row][distAttk[j].col].type] *
                    Math.max(0, ((10 - mapArray[distAttk[j].row][distAttk[j].col].defense) / 10)) *
                    unitArray[unitMove.x][unitMove.y].health / 100)
                )
            }
        }
        else{
            if(unitMove.x >= 1 && unitArray[unitMove.x-1][unitMove.y].type !== "noUnit" && unitArray[unitMove.x-1][unitMove.y].owner !== turn)
            {
                tempUnitArray[unitMove.x-1][unitMove.y].damage = calcDam[0]
            }
            if(unitMove.x < height-1 && unitArray[unitMove.x+1][unitMove.y].type !== "noUnit" && unitArray[unitMove.x+1][unitMove.y].owner !== turn)
            {
                tempUnitArray[unitMove.x+1][unitMove.y].damage = calcDam[1]
            }
            if(unitMove.y >= 1 && unitArray[unitMove.x][unitMove.y-1].type !== "noUnit" && unitArray[unitMove.x][unitMove.y-1].owner !== turn)
            {
                tempUnitArray[unitMove.x][unitMove.y-1].damage = calcDam[2]
            }
            if(unitMove.y < width-1 && unitArray[unitMove.x][unitMove.y+1].type !== "noUnit" && unitArray[unitMove.x][unitMove.y+1].owner !== turn)
            {
                tempUnitArray[unitMove.x][unitMove.y+1].damage = calcDam[3]
            }
        }

        setUnitArray(tempUnitArray);

        setCanFire(false);
        setIsFiring(true);
        confirmMove();
    }

    const captureAndMove = () => {
        let tempMapArray = mapArray.slice();

        tempMapArray[unitMove.x][unitMove.y].health = tempMapArray[unitMove.x][unitMove.y].health - unitArray[unitMove.x][unitMove.y].health;

        if(tempMapArray[unitMove.x][unitMove.y].health <= 0)
        {
            if(turn === "Red")
            {

                if(tempMapArray[unitMove.x][unitMove.y].owner === "Blue") bluePlayer.properties--;
                redPlayer.properties++;
                redPlayer.stats.PropertiesCaptured++;

                if(tempMapArray[unitMove.x][unitMove.y].building === "factory")
                {
                    tempMapArray[unitMove.x][unitMove.y] = {...TerrainTypes.redFactory};
                }
                else if(tempMapArray[unitMove.x][unitMove.y].building === "city")
                {
                    tempMapArray[unitMove.x][unitMove.y] = {...TerrainTypes.redCity};
                }
                else if(tempMapArray[unitMove.x][unitMove.y].building === "HQ")
                {
                    tempMapArray[unitMove.x][unitMove.y] = {...TerrainTypes.redHQ};
                    setVictory("Red")
                }
            }
            else
            {
                if(tempMapArray[unitMove.x][unitMove.y].owner === "Red") redPlayer.properties--;
                bluePlayer.properties++;
                bluePlayer.stats.PropertiesCaptured++;

                if(tempMapArray[unitMove.x][unitMove.y].building === "factory")
                {
                    tempMapArray[unitMove.x][unitMove.y] = {...TerrainTypes.blueFactory};
                }
                else if(tempMapArray[unitMove.x][unitMove.y].building === "city")
                {
                    tempMapArray[unitMove.x][unitMove.y] = {...TerrainTypes.blueCity};
                }
                else if(tempMapArray[unitMove.x][unitMove.y].building === "HQ")
                {
                    tempMapArray[unitMove.x][unitMove.y] = {...TerrainTypes.blueHQ};
                    setVictory("Blue")
                }

            }
        }
        setMapArray(tempMapArray);

        confirmMove();
    }

    const newTurn = () => {
        let tempUnitArray = unitArray.slice();
        setMovingUnit(false);
        //console.log(`Red funds: ${redPlayer.funds}, Blue funds ${bluePlayer.funds}`)

        if(turn === "Red")
        {
            setTurn("Blue");
            setCurPlayer(bluePlayer);
            bluePlayer.funds = updateFunds("Blue", "New Turn");

            for( let i in tempUnitArray)
            {
                for( let j in tempUnitArray[i])
                {
                    if(tempUnitArray[i][j].owner === "Blue")
                    {
                        tempUnitArray[i][j].exhausted = false;
                        if(mapArray[i][j].owner === "Blue"){
                            if(tempUnitArray[i][j].health < 80) tempUnitArray[i][j].health += 20
                            else tempUnitArray[i][j].health = 100
                        }
                    }
                }
            }
        }
        else
        {
            setTurn("Red");
            setCurPlayer(redPlayer);
            redPlayer.funds = updateFunds("Red", "New Turn");

            for( let i in tempUnitArray)
            {
                for( let j in tempUnitArray[i])
                {
                    if(tempUnitArray[i][j].owner === "Red")
                    {
                        tempUnitArray[i][j].exhausted = false;
                        if(mapArray[i][j].owner === "Red"){
                            if(tempUnitArray[i][j].health < 80) tempUnitArray[i][j].health += 20
                            else tempUnitArray[i][j].health = 100
                        }
                    }
                }
            }
        }

        setUnitArray(tempUnitArray);
        if(turn === "Blue")
        {
            let tempDay = day + 1;
            setDay(tempDay);
        }
        console.log("Day: " + day);
        console.log(turn + " current units: " + curPlayer.units);
    }

    const openPopupMenu = (event) => {
        setOpen(true)
        setPopPosition([event.clientX, event.clientY])
    };

    const closePopupMenu = () => {
            setOpen(false);
    };

    let popupPurchase = (unit, x, y) => {
        console.log(x + ", " + y);
        let tempUnitArray = unitArray.slice();

        if(unit === "soldier") {
            tempUnitArray[x][y] = getSoldier(turn);
        } else if (unit === "mech") {
            tempUnitArray[x][y] = getMech(turn);
        }
        else if (unit === "recon") {
            tempUnitArray[x][y] = getRecon(turn);
        }
        else if (unit === "tank") {
            tempUnitArray[x][y] = getTank(turn);
        }
        else if (unit === "medTank") {
            tempUnitArray[x][y] = getMedTank(turn);
        }
        else if (unit === "artillery") {
            console.log(`turn ${turn}`)
            tempUnitArray[x][y] = getArtillery(turn);
        }

        curPlayer.funds = updateFunds(turn, unit);
        setUnitArray(tempUnitArray);

        closePopupMenu();
    };

    function useFirstRender() {
        const firstRender = useRef(true);

        useEffect(() => {
            firstRender.current = false;
        }, []);

        return firstRender.current;
    }
    const firstRender = useFirstRender();

    useEffect(() => {
        if(!firstRender)
        {
            if(disableButtons)
            {
                setPopup(factoryMenu);
            }
            else
            {
                setPopup(buttonsMenu);
            }

            openPopupMenu(mouseEvent); //Popup menu start
        }
    }, [clickedPosition]);

    const id = open ? 'Popover menu' : undefined;

    let factoryMenu =
        <Fragment>
            <Box className="backgroundDiv" margin='auto'
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                <button
                    disabled={(curPlayer.funds < 1000)}
                    style={{cursor: ((curPlayer.funds >= 1000) ? 'pointer' : ''), width: 135}}
                    onClick={() => popupPurchase("soldier", clickedPosition[0], clickedPosition[1])}
                >
                    Infantry: 1000
                </button>

                <button
                    disabled={(curPlayer.funds < 3000)}
                    style={{cursor: ((curPlayer.funds >= 3000) ? 'pointer' : ''), width: 135}}
                    onClick={() => popupPurchase("mech", clickedPosition[0], clickedPosition[1])}
                >
                    RPG Infantry: 3000
                </button>


                <button
                    disabled={(curPlayer.funds < 4000)}
                    style={{cursor: ((curPlayer.funds >= 4000) ? 'pointer' : ''), width: 135}}
                    onClick={() => popupPurchase("recon", clickedPosition[0], clickedPosition[1])}
                >
                    Recon: 4000
                </button>

                <button
                    disabled={(curPlayer.funds < 7000)}
                    style={{cursor: ((curPlayer.funds >= 7000) ? 'pointer' : ''), width: 135}}
                    onClick={() => popupPurchase("tank", clickedPosition[0], clickedPosition[1])}
                >
                    Tank: 7000
                </button>

                <button
                    disabled={(curPlayer.funds < 6000)}
                    style={{cursor: ((curPlayer.funds >= 6000) ? 'pointer' : ''), width: 135}}
                    onClick={() => popupPurchase("artillery", clickedPosition[0], clickedPosition[1])}
                >
                    Artillery: 6000
                </button>

                {/*<button
                    disabled={(curPlayer.funds < 6000)}
                    style={{cursor: ((curPlayer.funds >= 6000) ? 'pointer' : ''), width: 135}}
                    onClick={() => popupPurchase("artillery", clickedPosition[0], clickedPosition[1])}
                >
                    Artillery: 6000
                </button>
                */}

                <button
                    disabled={(curPlayer.funds < 12000)}
                    style={{cursor: ((curPlayer.funds >= 12000) ? 'pointer' : ''), width: 135}}
                    onClick={() => popupPurchase("medTank", clickedPosition[0], clickedPosition[1])}
                >
                    Med Tank: 12000
                </button>
                <button
                    disabled={false}
                    style={{cursor: ('pointer'), width: 135}}
                    onClick={closePopupMenu}
                >
                    Cancel
                </button>
            </Box>
        </Fragment>


    let buttonsMenu =
        <PopupButtons
            newTurn={newTurn} confirmMove={confirmMove} cancelMove={cancelMove} fireAndMove={fireAndMove} captureAndMove={captureAndMove}
            disableButtons={disableButtons} isFiring={isFiring} movingUnit={movingUnit} canFire={canFire} canCapture={canCapture}
        />


    const [victoryImage, setVictoryImage] = useState(noUnit);
    useEffect(() => {
        console.log(`in victory useEffect`)
        if(victory==="Red")
        {
            setVictoryImage(redVictory);
            redPlayer.stats.Wins = 1;
            redPlayer.stats.GamesPlayed = 1;
            bluePlayer.stats.GamesPlayed = 1;
        }
        else if(victory==="Blue")
        {
            setVictoryImage(blueVictory);
            bluePlayer.stats.Wins = 1;
            redPlayer.stats.GamesPlayed = 1;
            bluePlayer.stats.GamesPlayed = 1;
        }
        if(redPlayer.user !== 'Guest') {
            redPlayer.user.GamesPlayed += redPlayer.stats.GamesPlayed;
            redPlayer.user.Wins += redPlayer.stats.Wins;
            redPlayer.user.UnitsDestroyed += redPlayer.stats.UnitsDestroyed;
            redPlayer.user.UnitsLost += redPlayer.stats.UnitsLost;
            redPlayer.user.PropertiesCaptured += redPlayer.stats.PropertiesCaptured;
            redPlayer.user.DamageDealt += redPlayer.stats.DamageDealt;
        }
        if(bluePlayer.user !== 'Guest') {
            bluePlayer.user.GamesPlayed += bluePlayer.stats.GamesPlayed;
            bluePlayer.user.Wins += bluePlayer.stats.Wins;
            bluePlayer.user.UnitsDestroyed += bluePlayer.stats.UnitsDestroyed;
            bluePlayer.user.UnitsLost += bluePlayer.stats.UnitsLost;
            bluePlayer.user.PropertiesCaptured += bluePlayer.stats.PropertiesCaptured;
            bluePlayer.user.DamageDealt += bluePlayer.stats.DamageDealt;
        }
    }, [victory]);


    if(victory === "")
    {
        return (
            <div >
                <Fragment>
                    <Box className="backgroundPattern"
                         margin='auto'
                         sx={{
                             display: "flex",
                             flexDirection: "column",
                             alignItems: "center",
                         }}
                         height="100vh"
                         width="100vw"
                    >
                        <TopMessage whosTurn={turn} day={day} redPlayer={redPlayer} bluePlayer={bluePlayer}/>
                        <Box>
                            <Popover
                                id={id}
                                open={open}
                                anchorReference="anchorPosition"
                                anchorPosition={{ top: popPosition[1], left: popPosition[0] }}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                            >
                                {popup}
                            </Popover>
                            <Box sx={{display: "flex", flexDirection: "row", spaceBetween: "10"}}>
                                <PlayerBox color={'Red'} player={redPlayer} username={redUsername}/>
                                <Map MAP_HEIGHT={height}
                                     MAP_WIDTH={width}
                                     unitsArray={unitArray}
                                     onClickCallback={mapClick}
                                     mapArray={mapArray}/>
                                <PlayerBox color={'Blue'} player={bluePlayer} username={blueUsername}/>
                            </Box>
                        </Box>
                        <br/>
                        <Box height="400" sx={{mb:5}} >
                            <button
                                disabled={!(disableButtons) || isFiring || movingUnit}
                                style={{cursor: (disableButtons === true ? 'pointer' : '')}}
                                onClick={newTurn}
                            >
                                End Turn
                            </button>
                        </Box>

                    </Box>
                </Fragment>
            </div>
        )
    }
    else
    {
        //console.log(`game over`)
        const api = new API();
        async function updateStats(gamesPlayed, wins, unitsDestroyed, unitsLost, propertiesCaptured, damageDealt, username) {
            console.log('in updateStats');
            api.updateStats(gamesPlayed, wins, unitsDestroyed, unitsLost, propertiesCaptured, damageDealt, username)
                .then(console.log('stats updated'));
        }
        if(redPlayer.user !== 'Guest') {
            updateStats(redPlayer.user.GamesPlayed,
                redPlayer.user.Wins,
                redPlayer.user.UnitsDestroyed,
                redPlayer.user.UnitsLost,
                redPlayer.user.PropertiesCaptured,
                redPlayer.user.DamageDealt,
                redPlayer.user.Username);
        }
        if(bluePlayer.user !== 'Guest') {
            updateStats(bluePlayer.user.GamesPlayed,
                bluePlayer.user.Wins,
                bluePlayer.user.UnitsDestroyed,
                bluePlayer.user.UnitsLost,
                bluePlayer.user.PropertiesCaptured,
                bluePlayer.user.DamageDealt,
                bluePlayer.user.Username);
        }

            return(
                    <Fragment >
                        <Box className="backgroundPattern"
                             margin='auto'
                             sx={{
                                 display: "flex",
                                 flexDirection: "column",
                                 alignItems: "center",
                             }}
                             height="100vh"
                             width="100vw"
                        >
                            <Box>
                                <Box className={victory} width="99vw" sx={{mt: 5, border: 2, borderRadius: '4px'}}>
                                    <Typography className="playerText" align="center" variant='h3' margin='auto'>
                                        {victory} Victory!
                                    </Typography>
                                </Box>

                                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <Box sx={{display: "flex", flexDirection: "row",}}>
                                        <StatBox color="Red" stats={redPlayer.stats} username={redUsername} total={false}/>
                                        <Box sx={{mt: 5, mx: 10, border: 2}}>
                                            <img className="victoryScreen" src={victoryImage} alt={"Victory Celebration"} />
                                        </Box>
                                        <StatBox color="Blue" stats={bluePlayer.stats} username={blueUsername} total={false}/>
                                    </Box>

                                    <Box className={victory} sx={{width: 160, height: 110, mt: 5, border: 2, borderRadius: '4px',
                                        display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <Button
                                            sx={{mt: 1.5, backgroundColor: '#444444', "&:hover": { backgroundColor: '#898989' }}}
                                            variant="contained"
                                            size="medium"
                                            onClick={props.replayAction}
                                        >
                                            Play Again
                                        </Button>

                                        <Button
                                            sx={{mt: 1.5, backgroundColor: '#444444', "&:hover": { backgroundColor: '#898989' }}}
                                            variant="contained"
                                            size="medium"
                                            onClick={props.logoutAction}
                                        >
                                            Logout
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Fragment>
            )
    }

}

export default App;
