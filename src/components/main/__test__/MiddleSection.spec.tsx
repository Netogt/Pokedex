import { render, screen } from "@testing-library/react"
import MiddleSection from "../MiddleSection"

jest.mock("../TypePokemon", () => ({ type }: { type: string }) => <div>{type}</div>)
jest.mock("../LogoPokeball", () => () => <div>logoPokeball</div>)
jest.mock("../../../context/pokeContext", () => ({
    usePokeContext: jest.fn().mockReturnValue({
        data: {
            response: [{
                id: 4, 
                name: "charmander", 
                sprites: "charmander.png", 
                types: [ { type: { name: "fire" } } ]
            }]
        }
    })
}))

describe("MiddleSection", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it("testing whether MiddleSection is being rendered", () => {
        render(<MiddleSection />)
        expect(screen.getByText("#4")).toBeInTheDocument()
        expect(screen.getByText("charmander")).toBeInTheDocument()
        expect(screen.getByAltText("Pokemon Image")).toBeInTheDocument()
        expect(screen.getByText("fire")).toBeInTheDocument()
    })
})