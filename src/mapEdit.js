import TerrainTypes from "./TerrainTypes";

const MapEdit = () => {

    return  [
        {
            ...TerrainTypes.redHQ,
            "Row": 0,
            "Column": 0
        },
        {
            ...TerrainTypes.redFactory,
            "Row": 1,
            "Column": 2
        },
        {
            ...TerrainTypes.neutralFactory,
            "Row": 2,
            "Column": 1
        },
        {
            ...TerrainTypes.neutralFactory,
            "Row": 7,
            "Column": 14
        },
        {
            ...TerrainTypes.blueFactory,
            "Row": 8,
            "Column": 13
        },
        {
            ...TerrainTypes.blueHQ,
            "Row": 9,
            "Column": 15
        }
    ]
}

const mapSize = [10,16]

export default MapEdit;
export let MapSize = mapSize;