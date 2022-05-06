
/*

So we'd need something like [current position], [current movement points], [current map]

onClick run the function
Start algo from curPos
Square [4] grid
Recursively run program from up, down, left, right? Or maybe a recursive helper
All 4 directions, call the program with curMove - 1
global variable has changeArray. 
After recursive functions return


*/

import {MapSize} from "./mapEdit"; //Size of map used
// const mapNum = 0; //We'll import this later from the map selection screen.
// let height
// let width

let redundancyArray = []

function resetRedundancy(height, width){
    // console.log(`Redundancy HW check - ${height}, ${width}`)
    let tempRedundancy = []
    for(let i = 0; i < height; i++){
        let tempArray = [];
        for(let j = 0; j < width; j++){
            tempArray.push(0)
        }
        tempRedundancy.push(tempArray);
    }
    redundancyArray = tempRedundancy
    return
}

// const posArray = [];
function pathing(unitArray, mapArray, row, col, height, width){
    console.log(`HW Cheque -> H${unitArray.length}, W${unitArray[0].length}`)
    height = unitArray.length
    width = unitArray[0].length 
    resetRedundancy(height, width);
    // console.log(`Redundancy Array ${redundancyArray}`)
    // for(let i = 0; i < MAP_HEIGHT; i++){
    //     let tempArray = [];
    //     for(let j = 0; j < MAP_WIDTH; j++){
    //         tempArray.push({visited: "no"});
    //     }
    //     posArray.push(tempArray);
    // }
    // console.log("posArray\n", posArray)
    // console.log(posArray[0][0].visited)
    console.log("pathing called @", row, col)
    // console.log("unitArray\n", unitArray)
    // console.log("mapArray\n", mapArray)
    // console.log(MAP_HEIGHT)
    // console.log(unitArray[row][col].movespeed)
    console.log(mapArray[row][col].moveCost[unitArray[row][col].movementType])
    console.log(`Move distance = ${unitArray[row][col].movespeed}`)
    let moveArray = recPath(unitArray[row][col].movespeed + mapArray[row][col].moveCost[unitArray[row][col].movementType], unitArray, mapArray, unitArray[row][col].owner, row, col, unitArray[row][col].movementType, height, width)
    console.log("moveArray\n", moveArray)
    console.log(`Moving unit of: ${unitArray[row][col].owner}`)
    return moveArray

};

// Without a value in map we can just run for a value, i.e. movement - cost
// With a value in map we can reduce redundant runs if it's costing too much
// Maybe set a in-function array? Since constants are given
// Pre-posArray runs = 55
// Post-posArray runs = 9
// Can't do this because intersecting path variants


function recPath(curMoves, unitArray, mapArray, curColor, r, c, moveType, height, width){
    console.log("Pathing Call")
    // console.log(`Redundancy Array ${redundancyArray}`)
    let retArray = []
    let finArray = []
    // finArray.push({row: r, col: c})
    // console.log(r, c)
    // console.log("Map Array @ recPath:\n", mapArray)
    let cost = mapArray[r][c].moveCost[moveType];
    
    // if(posArray[r][c].visited === "no"){
    //     posArray[r][c].visited = "yes"
    // }
    // else
    //     return

    // Any value > -1 is a valid movable spot
    let validity = curMoves - cost
    // console.log(`redundancyArray ${redundancyArray}`)
    if(validity >= redundancyArray[r][c])
        redundancyArray[r][c] = validity
    else
        return

    if(validity > -1){
        // If validity === 0 this is as far as this path goes
        if(validity === 0)
            return {row: r, col: c}
        // If validity > 0 we might be able to go further, thus continue 
        else
            finArray.push({row: r, col: c})
    }
    // if validity is < 0 then this spot is invalid
    else
        return
    
    // down
    if(r + 1 < height){
        if(unitArray[r + 1][c].type !== "noUnit" && unitArray[r + 1][c].owner !== curColor)
            retArray = undefined
        else
            retArray = recPath(curMoves - cost, unitArray, mapArray, curColor, r + 1, c, moveType, height, width);
        if(retArray !== undefined){
            finArray = finArray.concat(retArray);
            retArray = [];
        }
    }
    // up
    if(r - 1 > -1){
        if(unitArray[r - 1][c].type !== "noUnit" && unitArray[r - 1][c].owner !== curColor)
            retArray = undefined
        else
            retArray = recPath(curMoves - cost, unitArray, mapArray, curColor, r - 1, c, moveType, height, width);
        if(retArray !== undefined){
            finArray = finArray.concat(retArray);
            retArray = [];
        }
    }

    // right
    if(c + 1 < width){
        if(unitArray[r][c + 1].type !== "noUnit" && unitArray[r][c + 1].owner !== curColor)
            retArray = undefined
        else
            retArray = recPath(curMoves - cost, unitArray, mapArray, curColor, r, c + 1, moveType, height, width);
        if(retArray !== undefined){
            finArray = finArray.concat(retArray);
            retArray = [];
        }
    }
    // left
    if(c - 1 > -1){
        if(unitArray[r][c - 1].type !== "noUnit" && unitArray[r][c - 1].owner !== curColor)
            retArray = undefined
        else
            retArray = recPath(curMoves - cost, unitArray, mapArray, curColor, r, c - 1, moveType, height, width);
        if(retArray !== undefined){
            finArray = finArray.concat(retArray);
            retArray = [];
        }
    }
    return finArray
}



    let originRow = 0
    let originCol = 0

function rangeFinder(unitArray, row, col, height, width){
    
    console.log(`Distance Attack Called @ ${row} ${col}`);
    console.log(`HW Cheque -> H${unitArray.length}, W${unitArray[0].length}`)
    // height = unitArray.length
    // width = unitArray[0].length 
    
    // Since the range is 2-3 and 1 is invalid
    // We gotta keep track of the origin for check
    originRow = row
    originCol = col
    
    resetRedundancy(height, width);

    // Don't want to attack our own units
    let owner = unitArray[row][col].owner
    
    // return recAttack(unitArray, row, col, owner, 3);
    // console.log(`Yaboi\n ${JSON.stringify(yaboi)}`)
    return recAttack(unitArray, row, col, owner, 3, height, width);
}

function recAttack(unitArray, row, col, owner, mov, height, width){

    let retArray = []
    let finArray = []
    console.log(`Placer, origin ${originRow}, ${originCol}`)
    if(row === 6 && col === 5){
        console.log("Touched``````````````````````````````````````````````````")
    }
    // Redundancy check, shouldn't ignore reruns and less efficient runs
    if(redundancyArray[row][col] <= mov){
        redundancyArray[row][col] = mov
    }
    else
        return

    // Last tiles check
    if(mov === 0){ 
        // Don't want to attack nothing/our own units
        if(unitArray[row][col].type === "noUnit" || unitArray[row][col].owner === owner)
            return
        if(Math.abs(originRow - row) > 1 || Math.abs(originCol - col) > 1 || (Math.abs(originRow - row) === 1 && Math.abs(originCol - col) === 1))
            return {row: row, col: col}
        return
    }

    // Regular tiles check
    if(unitArray[row][col].type !== "noUnit" && unitArray[row][col].owner !== owner){
        // Invalidates enemies @ range of 1
        // Grid uses 4 square logic, i.e. can't move diagonally
        // Thus range of 1 can only be if col and row are BOTH at a distance of 1
        if(Math.abs(originRow - row) > 1 || Math.abs(originCol - col) > 1 || (Math.abs(originRow - row) === 1 && Math.abs(originCol - col) === 1))
            finArray.push({row: row, col: col})
    }

    // Down
    if(row + 1 < height)
        retArray = recAttack(unitArray, row + 1, col, owner, mov - 1, height, width)
        if(retArray !== undefined){ finArray = finArray.concat(retArray) }
        retArray = []

    // Up
    if(row - 1 > -1)
        retArray = recAttack(unitArray, row - 1, col, owner, mov - 1, height, width)
        if(retArray !== undefined){ finArray = finArray.concat(retArray) }
        retArray = []

    // Right
    if(col + 1 < width)
        retArray = recAttack(unitArray, row, col + 1, owner, mov - 1, height, width)
        if(retArray !== undefined){ finArray = finArray.concat(retArray) }
        retArray = []

    // Left
    if(col - 1 > -1)
        retArray = recAttack(unitArray, row, col - 1, owner, mov - 1, height, width)
        if(retArray !== undefined){ finArray = finArray.concat(retArray) }
        retArray = []

    return finArray
}

export {pathing, rangeFinder};
