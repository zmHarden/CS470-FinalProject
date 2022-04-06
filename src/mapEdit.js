const MapEdit = () => {

    const mapEditsArray = [
        {
            "Type": "redHQ",
            "Defense": 4,
            "Row": 0,
            "Column": 0
        },
        {
            "Type": "redFactory",
            "Defense": 3,
            "Row": 1,
            "Column": 2
        },
        {
            "Type": "redFactory",
            "Defense": 3,
            "Row": 2,
            "Column": 1
        },
        {
            "Type": "blueFactory",
            "Defense": 3,
            "Row": 7,
            "Column": 14
        },
        {
            "Type": "blueFactory",
            "Defense": 3,
            "Row": 8,
            "Column": 13
        },
        {
            "Type": "blueHQ",
            "Defense": 4,
            "Row": 9,
            "Column": 15
        }
    ]

    return mapEditsArray;
}

const mapSize = [10,16]

export default MapEdit;
export let MapSize = mapSize;