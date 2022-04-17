import water from './images/terrain/water.png'
import redHQ from './images/terrain/HQred.png'
import blueHQ from './images/terrain/HQblue.png'
import redFactory from './images/terrain/FactoryRed.png'
import blueFactory from './images/terrain/FactoryBlue.png'

const MapEdit = () => {

    return  [
        {
            type: redHQ,
            defense: 4,
            "Row": 0,
            "Column": 0
        },
        {
            type: redFactory,
            defense: 3,
            "Row": 1,
            "Column": 2
        },
        {
            type: redFactory,
            defense: 3,
            "Row": 2,
            "Column": 1
        },
        {
            type: blueFactory,
            defense: 3,
            "Row": 7,
            "Column": 14
        },
        {
            type: blueFactory,
            defense: 3,
            "Row": 8,
            "Column": 13
        },
        {
            type: blueHQ,
            defense: 4,
            "Row": 9,
            "Column": 15
        }
    ]
}

const mapSize = [10,16]

export default MapEdit;
export let MapSize = mapSize;