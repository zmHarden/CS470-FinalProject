import './App.css';
import React, {Fragment, useEffect, useRef, useState} from "react";
import {Box, Button, Popover, Typography} from "@mui/material";
import TopMessage from "./TopMessage";
import PlayerBox from "./PlayerBox";
import Map from "./Map";
import MapEdit from "./mapEdit"; //Definitions on what tiles differ from the generic all-plains map
import {MapSize} from "./mapEdit"; //Size of map used
import BottomButtons from "./BottomButtons";
import TerrainTypes from "./TerrainTypes";
import UnitTypes from "./UnitTypes";
import pathing from './pathing.js'
import noUnit from "./images/units/noUnit.png";
import redVictory from "./images/misc/redVictory.png";
import blueVictory from "./images/misc/blueVictory.png";

let unitOrigin = {x: 0, y: 0}
let unitMove = {x: 0, y: 0}
let moveB = []
let moveConfirmation = false;

const redPlayer = {funds: 2000, properties: 2, units: 0};
const bluePlayer = {funds: 0, properties: 2, units: 0};

function App(props) {

    //document.body.style = 'background: #debe95;';
    const mapNum = 0; //We'll import this later from the map selection screen.

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
    let getTank = (owner) => {
        if(owner === "Red") {redPlayer.units++; return {...UnitTypes.redTank}}
        else {bluePlayer.units++; return {...UnitTypes.blueTank}}
    }
    let getSoldier = (owner) => {
        if(owner === "Red") {redPlayer.units++; return {...UnitTypes.redSoldier}}
        else { bluePlayer.units++; return {...UnitTypes.blueSoldier}}
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
        } else if (transaction === "tank"){
            newFunds = player.funds - 7000;
        }

        return newFunds
    };

    const mapClick = (x,y, event) => {

        console.log(`exhausted: ${unitArray[x][y].exhausted}`)
        console.log(`movingUnit: ${movingUnit}`)
        console.log(`moveConfirmation: ${moveConfirmation}`)
        console.log(`isFiring: ${isFiring}`)

        if(mapArray[x][y].owner === turn && mapArray[x][y].building === "factory" && unitArray[x][y].type === "noUnit" && !movingUnit && !moveConfirmation && !isFiring){
            setMouseEvent(event);
            //console.log("x, y: " + x + ", " + y)
            setClickedPosition([x, y] );
            //console.log("clickedPos: " + clickedPosition[0] + ", " + clickedPosition[1])
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
                        if(bluePlayer.units === 0) {setVictory("Red")/*Red Victory*/}
                    }
                    else
                    {
                        redPlayer.units--;
                        if(redPlayer.units === 0) {setVictory("Blue")/*Blue Victory*/}
                    }
                }
                else
                {
                    tempUnitArray[unitMove.x][unitMove.y].health = tempUnitArray[unitMove.x][unitMove.y].health -
                        Math.ceil(tempUnitArray[x][y].damageVals[tempUnitArray[unitMove.x][unitMove.y].type] *
                        Math.max(0, ((10-mapArray[unitMove.x][unitMove.y].defense)/10)) *
                        tempUnitArray[x][y].health/100);

                    if (tempUnitArray[unitMove.x][unitMove.y].health <= 0)
                    {
                        tempUnitArray[unitMove.x][unitMove.y] = getBlankUnit();
                        if(turn === "Red")
                        {
                            redPlayer.units--;
                            if(redPlayer.units === 0) {setVictory("Blue")/*Blue Victory*/}
                        }
                        else
                        {
                            bluePlayer.units--;
                            if(bluePlayer.units === 0) {setVictory("Red")/*Red Victory*/}
                        }
                    }
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

            let tempDam = calcDam.slice();

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

            if(mapArray[unitMove.x][unitMove.y].capturable === true && mapArray[unitMove.x][unitMove.y].owner !== turn && unitArray[unitMove.x][unitMove.y].movementType === "foot")
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
        setDisableButtons(true);
        setCanFire(false);
        setCanCapture(false);
        unitArray[unitMove.x][unitMove.y].exhausted = true;
        moveConfirmation = false;
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
    }
    const fireAndMove = () => {

        let tempUnitArray = unitArray.slice();

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

        if(unit === "tank") {
            tempUnitArray[x][y] = getTank(turn);
        } else if (unit === "soldier") {
            tempUnitArray[x][y] = getSoldier(turn);
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
            setPopup(factoryMenu);
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
                    style={{cursor: ((curPlayer.funds >= 1000) ? 'pointer' : ''), width: 120}}
                    onClick={() => popupPurchase("soldier", clickedPosition[0], clickedPosition[1])}
                >
                    Infantry: 1000
                </button>
                {/*
                <button
                    disabled={(curPlayer.funds < 3000)}
                    style={{cursor: ((curPlayer.funds >= 3000) ? 'pointer' : ''), width: 120}}
                    onClick={() => popupPurchase("mech", clickedPosition[0], clickedPosition[1])}
                >
                    RPG Infantry: 3000
                </button>
                */}
                {/*
                <button
                    disabled={(curPlayer.funds < 4000)}
                    style={{cursor: ((curPlayer.funds >= 4000) ? 'pointer' : ''), width: 120}}
                    onClick={() => popupPurchase("recon", clickedPosition[0], clickedPosition[1])}
                >
                    Recon: 4000
                </button>
                */}
                <button
                    disabled={(curPlayer.funds < 7000)}
                    style={{cursor: ((curPlayer.funds >= 7000) ? 'pointer' : ''), width: 120}}
                    onClick={() => popupPurchase("tank", clickedPosition[0], clickedPosition[1])}
                >
                    Tank: 7000
                </button>

                {/*<button
                    disabled={(curPlayer.funds < 6000)}
                    style={{cursor: ((curPlayer.funds >= 6000) ? 'pointer' : ''), width: 120}}
                    onClick={() => popupPurchase("artillery", clickedPosition[0], clickedPosition[1])}
                >
                    Artillery: 6000
                </button>
                */}
                {/*
                <button
                    disabled={(curPlayer.funds < 12000)}
                    style={{cursor: ((curPlayer.funds >= 12000) ? 'pointer' : ''), width: 120}}
                    onClick={() => popupPurchase("mTank", clickedPosition[0], clickedPosition[1])}
                >
                    Med Tank: 12000
                </button>*/}
                <button
                    disabled={false}
                    style={{cursor: ('pointer'), width: 120}}
                    onClick={closePopupMenu}
                >
                    Cancel
                </button>
            </Box>
        </Fragment>
    let buttonsMenu =
        <BottomButtons
            newTurn={newTurn} confirmMove={confirmMove} cancelMove={cancelMove} fireAndMove={fireAndMove} captureAndMove={captureAndMove}
            disableButtons={disableButtons} isFiring={isFiring} movingUnit={movingUnit} canFire={canFire} canCapture={canCapture}
        />

    const [victoryImage, setVictoryImage] = useState(noUnit);
    useEffect(() => {
        if(victory==="Red")
        {
            setVictoryImage(redVictory);
        }
        else if(victory==="Blue")
        {
            setVictoryImage(blueVictory);
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
                                <PlayerBox player={'Red'} redPlayer={redPlayer} bluePlayer={bluePlayer}/>
                                <Map MAP_HEIGHT={height}
                                     MAP_WIDTH={width}
                                     unitsArray={unitArray}
                                     onClickCallback={mapClick}
                                     mapArray={mapArray}/>
                                <PlayerBox player={'Blue'} redPlayer={redPlayer} bluePlayer={bluePlayer}/>
                            </Box>
                        </Box>
                        <br/>
                        <BottomButtons
                            newTurn={newTurn} confirmMove={confirmMove} cancelMove={cancelMove} fireAndMove={fireAndMove} captureAndMove={captureAndMove}
                            disableButtons={disableButtons} isFiring={isFiring} movingUnit={movingUnit} canFire={canFire} canCapture={canCapture}
                        />

                    </Box>
                </Fragment>
            </div>
        )
    }
    else
    {
            return(
                    <Fragment >
                        <br/>
                        <Typography className="playerText" align="center" variant='h3' margin='auto' sx={{ border: 3, borderColor: 'black', borderRadius: '4px', backgroundColor: victory }}>
                            {victory} Victory!
                        </Typography>
                        <br/>

                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Box margin='auto' sx={{border: 3, borderColor: victory}}>
                                <img src={victoryImage} alt={"Victory Celebration"} />
                            </Box>

                            <br/>
                            <Button
                                disabled={false}
                                variant="outlined"
                                size="medium"
                                onClick={props.logoutAction}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Fragment>
            )
    }

}

export default App;