import noUnit from './images/units/noUnit.png'

import redTank from './images/units/tankRed.png'
import blueTank from './images/units/tankBlue.png'

import redMedTank from './images/units/medTankRed.png'
import blueMedTank from './images/units/medTankBlue.png'

import redSoldier from './images/units/soldierRed.png'
import blueSoldier from './images/units/soldierBlue.png'

import redMech from './images/units/mechRed.png'
import blueMech from './images/units/mechBlue.png'

const UnitTypes = {
    noUnit: {
        img: noUnit,
        type: "noUnit",
        damage: -1,
        owner: "",
        health: 100,
        movementType: "",
        movespeed: 0,
        exhausted: true,
        damageVals: {}
    },
    redSoldier: {
        img: redSoldier,
        type: "soldier",
        damage: -1,
        owner: "Red",
        health: 100,
        cost: 1000,
        movementType: "foot",
        movespeed: 3,
        exhausted: true,
        damageVals: {
            soldier: 55,
            tank: 5
        },
    },
    redTank: {
        img: redTank,
        type: "tank",
        damage: -1,
        owner: "Red",
        health: 100,
        cost: 7000,
        movementType: "treads",
        movespeed: 6,
        exhausted: true,
        damageVals: {
            soldier: 75,
            tank: 55
        },
    },
    blueSoldier: {
        img: blueSoldier,
        type: "soldier",
        damage: -1,
        owner: "Blue",
        health: 100,
        cost: 1000,
        movementType: "foot",
        movespeed: 3,
        exhausted: true,
        damageVals: {
            soldier: 55,
            tank: 5
        },
    },
    blueTank: {
        img: blueTank,
        type: "tank",
        damage: -1,
        owner: "Blue",
        health: 100,
        cost: 7000,
        movementType: "treads",
        movespeed: 6,
        exhausted: true,
        damageVals: {
            soldier: 75,
            tank: 55
        },
    },
};

export default UnitTypes;