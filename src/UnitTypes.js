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
        target: "soldier",
        owner: "Red",
        health: 100,
        cost: 1000,
        movementType: "Foot",
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
        target: "tank",
        owner: "Red",
        health: 100,
        cost: 7000,
        movementType: "Treads",
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
        target: "soldier",
        owner: "Blue",
        health: 100,
        cost: 1000,
        movementType: "Foot",
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
        target: "tank",
        owner: "Blue",
        health: 100,
        cost: 7000,
        movementType: "Treads",
        movespeed: 6,
        exhausted: true,
        damageVals: [
            {target: "soldier", damage: 75},
            {target: "tank", damage: 55}
        ]
    },
};

export default UnitTypes;