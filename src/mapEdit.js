import TerrainTypes from "./TerrainTypes";

const MapEdit = () => {

    return  [
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
            ...TerrainTypes.roadHorizontalNorth,
            "Row": 2,
            "Column": 2
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 2,
            "Column": 3
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 2,
            "Column": 4
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 2,
            "Column": 5
        },
        {
            ...TerrainTypes.neutralCity,
            "Row": 2,
            "Column": 6
        },
        {
            ...TerrainTypes.mountain,
            "Row": 2,
            "Column": 7
        },
        {
            ...TerrainTypes.roadEastSouth,
            "Row": 2,
            "Column": 8
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 2,
            "Column": 9
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 2,
            "Column": 10
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 2,
            "Column": 11
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 2,
            "Column": 12
        },
        {
            ...TerrainTypes.neutralCity,
            "Row": 2,
            "Column": 13
        },
        {
            ...TerrainTypes.roadVertical,
            "Row": 3,
            "Column": 6
        },
        {
            ...TerrainTypes.woods,
            "Row": 3,
            "Column": 7
        },
        {
            ...TerrainTypes.roadVertical,
            "Row": 3,
            "Column": 8
        },
        {
            ...TerrainTypes.roadVertical,
            "Row": 4,
            "Column": 6
        },
        {
            ...TerrainTypes.woods,
            "Row": 4,
            "Column": 7
        },
        {
            ...TerrainTypes.roadVertical,
            "Row": 4,
            "Column": 8
        },
        {
            ...TerrainTypes.blueHQ,
            "Row": 4,
            "Column": 13
        },
        {
            ...TerrainTypes.redHQ,
            "Row": 5,
            "Column": 2
        },
        {
            ...TerrainTypes.roadVerticalEast,
            "Row": 5,
            "Column": 6
        },
        {
            ...TerrainTypes.neutralFactory,
            "Row": 5,
            "Column": 7
        },
        {
            ...TerrainTypes.roadVerticalWest,
            "Row": 5,
            "Column": 8
        },
        {
            ...TerrainTypes.roadVertical,
            "Row": 6,
            "Column": 6
        },
        {
            ...TerrainTypes.woods,
            "Row": 6,
            "Column": 7
        },
        {
            ...TerrainTypes.roadVertical,
            "Row": 6,
            "Column": 8
        },
        {
            ...TerrainTypes.neutralCity,
            "Row": 7,
            "Column": 2
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 7,
            "Column": 3
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 7,
            "Column": 4
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 7,
            "Column": 5
        },
        {
            ...TerrainTypes.roadWestNorth,
            "Row": 7,
            "Column": 6
        },
        {
            ...TerrainTypes.mountain,
            "Row": 7,
            "Column": 7
        },
        {
            ...TerrainTypes.neutralCity,
            "Row": 7,
            "Column": 8
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 7,
            "Column": 9
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 7,
            "Column": 10
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 7,
            "Column": 11
        },
        {
            ...TerrainTypes.roadHorizontal,
            "Row": 7,
            "Column": 12
        },
        {
            ...TerrainTypes.roadHorizontalSouth,
            "Row": 7,
            "Column": 13
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
        }
    ]
}

const mapSize = [10,16]

export default MapEdit;
export let MapSize = mapSize;