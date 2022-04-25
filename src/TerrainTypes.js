import plain from './images/terrain/tile_grass_64.png'
import highPlain from './images/terrain/tile_grass_highlight.png'

import redFactory from './images/terrain/FactoryRed.png'
import highRedFactory from './images/terrain/FactoryRedHighlight.png'

import redHQ from './images/terrain/HQred.png'
import highRedHQ from './images/terrain/HQredHighlight.png'

import blueHQ from './images/terrain/HQblue.png'
import highBlueHQ from './images/terrain/HighHQblue.png'

import blueFactory from './images/terrain/FactoryBlue.png'
import highBlueFactory from './images/terrain/HighFactoryBlue.png'

import neutralFactory from "./images/terrain/FactoryNeutral.png";
import highNeutralFactory from "./images/terrain/FactoryNeutralHighlight.png"

const TerrainTypes = {
    plain:{
        img: plain,
        type: "plain",
        defense:1,
        health: 200,
        moveCost: 1,
        movable: false,
        capturable: false
    },
    highPlain:{
        img: highPlain,
        type: "highPlain",
        defense:1,
        health: 200,
        moveCost: 1,
        movable: false,
        capturable: false
    },

    redHQ:{
        img: redHQ,
        type: "redHQ",
        building: "HQ",
        defense: 4,
        health: 200,
        owner: "Red",
        moveCost: 1,
        movable: false,
        capturable: true
    },
    highRedHQ:{
        img: highRedHQ,
        type: "highRedHQ",
        building: "HQ",
        defense: 4,
        health: 200,
        owner: "Red",
        moveCost: 1,
        movable: false,
        capturable: true
    },

    blueHQ:{
        img: blueHQ,
        type: "blueHQ",
        building: "HQ",
        defense: 4,
        health: 200,
        owner: "Blue",
        moveCost: 1,
        movable: false,
        capturable: true
    },
    highBlueHQ:{
        img: highBlueHQ,
        type: "highBlueHQ",
        building: "HQ",
        defense: 4,
        health: 200,
        owner: "Blue",
        moveCost: 1,
        movable: false,
        capturable: true
    },

    redFactory:{
        img: redFactory,
        type: "redFactory",
        building: "factory",
        defense: 3,
        health: 200,
        owner: "Red",
        moveCost: 1,
        movable: false,
        capturable: true
    },
    highRedFactory:{
        img: highRedFactory,
        type: "highRedFactory",
        building: "factory",
        defense: 3,
        health: 200,
        owner: "Red",
        moveCost: 1,
        movable: false,
        capturable: true
    },

    blueFactory:{
        img: blueFactory,
        type: "blueFactory",
        building: "factory",
        defense: 3,
        health: 200,
        owner: "Blue",
        moveCost: 1,
        movable: false,
        capturable: true
    },
    highBlueFactory:{
        img: highBlueFactory,
        type: "highBlueFactory",
        building: "factory",
        defense: 3,
        health: 200,
        owner: "Blue",
        moveCost: 1,
        movable: false,
        capturable: true
    },

    neutralFactory:{
        img: neutralFactory,
        type: "neutralFactory",
        building: "factory",
        defense: 3,
        health: 200,
        owner: "",
        moveCost: 1,
        movable: false,
        capturable: true
    },
    highNeutralFactory:{
        img: highNeutralFactory,
        type: "highNeutralFactory",
        building: "factory",
        defense: 3,
        health: 200,
        owner: "",
        moveCost: 1,
        movable: false,
        capturable: true
    },
};

export default TerrainTypes;