import plain from './images/terrain/tile_grass_64.png'
import redFactory from './images/terrain/FactoryRed.png'
import redHQ from './images/terrain/HQred.png'
import blueHQ from './images/terrain/HQblue.png'
import blueFactory from './images/terrain/FactoryBlue.png'
import neutralFactory from "./images/terrain/FactoryNeutral.png";

const TerrainTypes = {
    plain:{
        img: plain,
        type: "plain",
        defense:1,
        health: 200,
        moveCost: 1,
        movable: false,
        capturable: false,
        highlight: "noHighlight"
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
        capturable: true,
        highlight: "noHighlight"
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
        capturable: true,
        highlight: "noHighlight"
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
        capturable: true,
        highlight: "noHighlight"
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
        capturable: true,
        highlight: "noHighlight"
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
        capturable: true,
        highlight: "noHighlight"
    },
};

export default TerrainTypes;