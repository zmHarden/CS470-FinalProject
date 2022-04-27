import plain from './images/terrain/tile_grass_64.png'
import redFactory from './images/terrain/FactoryRed.png'
import redHQ from './images/terrain/HQred.png'
import blueHQ from './images/terrain/HQblue.png'
import blueFactory from './images/terrain/FactoryBlue.png'
import neutralFactory from './images/terrain/FactoryNeutral.png'
import woods from './images/terrain/forest.png'
import mountain from './images/terrain/mountain.png'
import redCity from './images/terrain/cityRed.png'
import blueCity from './images/terrain/cityBlue.png'
import neutralCity from './images/terrain/cityNeutral.png'

import roadHorizontal from './images/terrain/roadHorizontal.png'
import roadVertical from './images/terrain/roadVertical.png'
import roadEastNorth from './images/terrain/roadEastNorth.png'
import roadEastSouth from './images/terrain/roadEastSouth.png'
import roadWestNorth from './images/terrain/roadWestNorth.png'
import roadWestSouth from './images/terrain/roadWestSouth.png'
import roadFourWay from './images/terrain/roadFourWay.png'
import roadHorizontalNorth from './images/terrain/roadHorizontalNorth.png'
import roadHorizontalSouth from './images/terrain/roadHorizontalSouth.png'
import roadVerticalEast from './images/terrain/roadVerticalEast.png'
import roadVerticalWest from './images/terrain/roadVerticalWest.png'

const TerrainTypes = {
    plain:{
        img: plain,
        type: "plain",
        defense:1,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 1
        },
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
        moveCost: {
            foot: 1,
            treads: 1
        },
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
        moveCost: {
            foot: 1,
            treads: 1
        },
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
        moveCost: {
            foot: 1,
            treads: 1
        },
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
        moveCost: {
            foot: 1,
            treads: 1
        },
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
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: true,
        highlight: "noHighlight"
    },

    redCity:{
        img: redCity,
        type: "redCity",
        building: "city",
        defense: 3,
        health: 200,
        owner: "Red",
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: true,
        highlight: "noHighlight"
    },

    blueCity:{
        img: blueCity,
        type: "blueCity",
        building: "city",
        defense: 3,
        health: 200,
        owner: "Blue",
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: true,
        highlight: "noHighlight"
    },

    neutralCity:{
        img: neutralCity,
        type: "neutralCity",
        building: "city",
        defense: 3,
        health: 200,
        owner: "",
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: true,
        highlight: "noHighlight"
    },


    woods:{
        img: woods,
        type: "woods",
        defense: 2,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 2
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },

    mountain:{
        img: mountain,
        type: "mountain",
        defense: 4,
        health: 200,
        moveCost: {
            foot: 2,
            treads: 99
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },

    roadHorizontal:{
        img: roadHorizontal,
        type: "road",
        defense: 0,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },
    roadVertical:{
        img: roadVertical,
        type: "road",
        defense: 0,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },
    roadEastNorth:{
        img: roadEastNorth,
        type: "road",
        defense: 0,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },
    roadEastSouth:{
        img: roadEastSouth,
        type: "road",
        defense: 0,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },
    roadWestNorth:{
        img: roadWestNorth,
        type: "road",
        defense: 0,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },
    roadWestSouth:{
        img: roadWestSouth,
        type: "road",
        defense: 0,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },
    roadFourWay:{
        img: roadFourWay,
        type: "road",
        defense: 0,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },
    roadHorizontalNorth:{
        img: roadHorizontalNorth,
        type: "road",
        defense: 0,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },
    roadHorizontalSouth:{
        img: roadHorizontalSouth,
        type: "road",
        defense: 0,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },
    roadVerticalEast:{
        img: roadVerticalEast,
        type: "road",
        defense: 0,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },
    roadVerticalWest:{
        img: roadVerticalWest,
        type: "road",
        defense: 0,
        health: 200,
        moveCost: {
            foot: 1,
            treads: 1
        },
        movable: false,
        capturable: false,
        highlight: "noHighlight"
    },
};

export default TerrainTypes;