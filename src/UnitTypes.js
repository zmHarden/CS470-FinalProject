import noUnit from './images/units/noUnit.png'

import redTank from './images/units/tankRed.png'
import blueTank from './images/units/tankBlue.png'

import redMedTank from './images/units/medTankRed.png'
import blueMedTank from './images/units/medTankBlue.png'

import redRecon from './images/units/reconRed.png'
import blueRecon from './images/units/reconBlue.png'

import redSoldier from './images/units/soldierRed.png'
import blueSoldier from './images/units/soldierBlue.png'

import redMech from './images/units/mechRed.png'
import blueMech from './images/units/mechBlue.png'

import redArtillery from './images/units/redArtillery.png'
import blueArtillery from './images/units/blueArtillery.png'

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
            mech: 45,
            recon: 12,
            tank: 5,
            medTank: 1
        },
    },
    redMech: {
        img: redMech,
        type: "mech",
        damage: -1,
        owner: "Red",
        health: 100,
        cost: 3000,
        movementType: "mech",
        movespeed: 2,
        exhausted: true,
        damageVals: {
            soldier: 65,
            mech: 55,
            recon: 85,
            tank: 55,
            medTank: 15
        },
    },
    redRecon: {
        img: redRecon,
        type: "recon",
        damage: -1,
        owner: "Red",
        health: 100,
        cost: 4000,
        movementType: "tires",
        movespeed: 8,
        exhausted: true,
        damageVals: {
            soldier: 70,
            mech: 65,
            recon: 35,
            tank: 6,
            medTank: 1
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
            mech: 70,
            recon: 85,
            tank: 55,
            medTank: 15
        },
    },
    redMedTank: {
        img: redMedTank,
        type: "medTank",
        damage: -1,
        owner: "Red",
        health: 100,
        cost: 12000,
        movementType: "treads",
        movespeed: 5,
        exhausted: true,
        damageVals: {
            soldier: 105,
            mech: 95,
            recon: 105,
            tank: 85,
            medTank: 55
        },
    },
    redArtillery: {
        img: redArtillery,
        type: "artillery",
        damage: -1,
        owner: "Red",
        health: 100,
        cost: 6000,
        movementType: "treads",
        movespeed: 4,
        exhausted: true,
        damageVals: {
            soldier: 90,
            mech: 85,
            recon: 65,
            tank: 55,
            medTank: 40
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
            mech: 45,
            recon: 12,
            tank: 5,
            medTank: 1
        },
    },
    blueMech: {
        img: blueMech,
        type: "mech",
        damage: -1,
        owner: "Blue",
        health: 100,
        cost: 3000,
        movementType: "mech",
        movespeed: 2,
        exhausted: true,
        damageVals: {
            soldier: 65,
            mech: 55,
            recon: 85,
            tank: 55,
            medTank: 15
        },
    },
    blueRecon: {
        img: blueRecon,
        type: "recon",
        damage: -1,
        owner: "Blue",
        health: 100,
        cost: 4000,
        movementType: "tires",
        movespeed: 8,
        exhausted: true,
        damageVals: {
            soldier: 70,
            mech: 65,
            recon: 35,
            tank: 6,
            medTank: 1
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
            mech: 70,
            recon: 85,
            tank: 55,
            medTank: 15
        },
    },
    blueMedTank: {
        img: blueMedTank,
        type: "medTank",
        damage: -1,
        owner: "Blue",
        health: 100,
        cost: 12000,
        movementType: "treads",
        movespeed: 5,
        exhausted: true,
        damageVals: {
            soldier: 105,
            mech: 95,
            recon: 105,
            tank: 85,
            medTank: 55
        },
    },
    blueArtillery: {
        img: blueArtillery,
        type: "artillery",
        damage: -1,
        owner: "Blue",
        health: 100,
        cost: 6000,
        movementType: "treads",
        movespeed: 4,
        exhausted: true,
        damageVals: {
            soldier: 90,
            mech: 85,
            recon: 65,
            tank: 55,
            medTank: 40
        },
    },
};

export default UnitTypes;
