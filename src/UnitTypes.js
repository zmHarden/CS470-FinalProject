import noUnit from './images/units/noUnit.png'
import redTank from './images/units/tankRed.png'
import blueTank from './images/units/tankBlue.png'
import redSoldier from './images/units/soldierRed.png'
import blueSoldier from './images/units/soldierBlue.png'

const UnitTypes = {
    noUnit: {
        img: noUnit,
        type: "noUnit",
        target: "",
        damage: -1,
        owner: "",
        health: 100,
        movementType: "",
        movespeed: 0,
        exhausted: true,
        damageVals: []
    },
    redSoldier: {
        img: redSoldier,
        type: "redSoldier",
        target: 0,
        damage: -1,
        owner: "Red",
        health: 100,
        cost: 1000,
        movementType: "foot",
        movespeed: 3,
        exhausted: true,
        damageVals: [
            {target: "soldier", damage: 55},
            {target: "tank", damage: 5}
        ]
    },
    redTank: {
        img: redTank,
        type: "redTank",
        target: 1,
        damage: -1,
        owner: "Red",
        health: 100,
        cost: 7000,
        movementType: "treads",
        movespeed: 6,
        exhausted: true,
        damageVals: [
            {target: "soldier", damage: 75},
            {target: "tank", damage: 55}
        ]
    },
    blueSoldier: {
        img: blueSoldier,
        type: "blueSoldier",
        target: 0,
        damage: -1,
        owner: "Blue",
        health: 100,
        cost: 1000,
        movementType: "foot",
        movespeed: 3,
        exhausted: true,
        damageVals: [
            {target: "soldier", damage: 55},
            {target: "tank", damage: 5}
        ]
    },
    blueTank: {
        img: blueTank,
        type: "blueTank",
        target: 1,
        damage: -1,
        owner: "Blue",
        health: 100,
        cost: 7000,
        movementType: "treads",
        movespeed: 6,
        exhausted: true,
        damageVals: [
            {target: "soldier", damage: 75},
            {target: "tank", damage: 55}
        ]
    },
};

export default UnitTypes;