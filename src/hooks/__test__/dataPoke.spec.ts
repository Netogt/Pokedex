import { dataPoke, dataListPoke } from "../useFetch";

const res1 = {
    height: 6,
    weight: 85,
    abilities: [{ ability: { name: "blaze" } }],
    id: 4,
    name: "charmander",
    sprites: { other: { 'official-artwork': { front_default: "charmander.png" } } },
    types: [{ type: { name: "fire" } }],
    stats: [
        { base_stat: 39 },
        { base_stat: 52 },
        { base_stat: 43 },
        { base_stat: 60 },
        { base_stat: 50 },
        { base_stat: 65 }
    ]
}
const res2 = {
    shape: { name: "upright" },
    generation: { name: "generation-I" }
}

describe("dataPoke", () => {
    it("testing whether the return from the dataPoke function is correct", () => {
        const response = [res1, res2]
        const data = dataPoke(response as any)

        expect(data).toEqual([{
            height: 6,
            weight: 85,
            abilities: "blaze",
            id: 4,
            name: "charmander",
            sprites: "charmander.png",
            types: [{ type: { name: "fire" } }],
            stats: [
                { base_stat: 39 },
                { base_stat: 52 },
                { base_stat: 43 },
                { base_stat: 60 },
                { base_stat: 50 },
                { base_stat: 65 }
            ],
            shape: "upright",
            generation: "generation-I"
        }])
    })
})

describe("dataListPoke", () => {
    it("testing whether the return from the dataListPoke function is correct", () => {
        const response = [res1, res1]
        const data = dataListPoke(response as any)
        
        expect(data).toEqual([
            {
                id: 4,
                name: "charmander",
                sprites: "charmander.png",
                types: [{ type: { name: "fire" } }],
            },
            {
                id: 4,
                name: "charmander",
                sprites: "charmander.png",
                types: [{ type: { name: "fire" } }],
            }
        ])
    })
})