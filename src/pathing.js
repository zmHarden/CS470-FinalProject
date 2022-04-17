


// Hmm?

import { MAP_HEIGHT, MAP_WIDTH } from "./constants"

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

// const posArray = [];
function pathing(unitArray, mapArray, row, col){
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
    console.log(mapArray[row][col].moveCost)
    console.log(`Move distance = ${unitArray[row][col].movespeed}`)
    let moveArray = recPath(unitArray[row][col].movespeed + mapArray[row][col].moveCost, mapArray, row, col)
    console.log("moveArray\n", moveArray)

    return moveArray

};

// Without a value in map we can just run for a value, i.e. movement - cost
// With a value in map we can reduce redundant runs if it's costing too much
// Maybe set a in-function array? Since constants are given
// Pre-posArray runs = 55
// Post-posArray runs = 9
// Can't do this because intersecting path variants


function recPath(curMoves, mapArray, r, c){
    let retArray = []
    let finArray = []
    // finArray.push({row: r, col: c})
    // console.log(r, c)
    let cost = mapArray[r][c].moveCost;
    
    // if(posArray[r][c].visited === "no"){
    //     posArray[r][c].visited = "yes"
    // }
    // else
    //     return

    // Any value > -1 is a valid movable spot
    let validity = curMoves - cost
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
    if(r + 1 < MAP_HEIGHT){
        retArray = recPath(curMoves - cost, mapArray, r + 1, c);
        if(retArray !== undefined){
            finArray = finArray.concat(retArray);
            retArray = [];
        }
    }
    // up
    if(r - 1 > -1){
        retArray = recPath(curMoves - cost, mapArray, r - 1, c);
        if(retArray !== undefined){
            finArray = finArray.concat(retArray);
            retArray = [];
        }
    }

    // right
    if(c + 1 < MAP_WIDTH){
        retArray = recPath(curMoves - cost, mapArray, r, c + 1);
        if(retArray !== undefined){
            finArray = finArray.concat(retArray);
            retArray = [];
        }
    }
    // left
    if(c - 1 > -1){
        retArray = recPath(curMoves - cost, mapArray, r, c - 1);
        if(retArray !== undefined){
            finArray = finArray.concat(retArray);
            retArray = [];
        }
    }
    return finArray
}

export default pathing;