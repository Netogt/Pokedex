import { getUrl } from "../useFetch";

describe("getUrl", () => {
    it("testing whether the function's return is correct if the type argument is pokemon", () => {
        const propsGetUrl = {
            type: "pokemon",
            fetch: {
                pokemon: 1,
            }
        }
        const baseUrl = "https://pokeapi.co/api/v2/"
        const returnGetUrl = getUrl(propsGetUrl, baseUrl)

        expect(returnGetUrl).toContain("https://pokeapi.co/api/v2/pokemon/1")
        expect(returnGetUrl).toContain("https://pokeapi.co/api/v2/pokemon-species/1")
    })

    it("testing whether the function's return is correct if the type argument is list", () => {
        const propsGetUrl = {
            type: "list",
            fetch: {
                listPokemon: {
                    start: 10,
                    end: 12
                }
            }
        }
        const baseUrl = "https://pokeapi.co/api/v2/"
        const returnGetUrl = getUrl(propsGetUrl, baseUrl)

        expect(returnGetUrl).toContain("https://pokeapi.co/api/v2/pokemon/10")
        expect(returnGetUrl).toContain("https://pokeapi.co/api/v2/pokemon/11")
        expect(returnGetUrl).toContain("https://pokeapi.co/api/v2/pokemon/12")

    })
}) 