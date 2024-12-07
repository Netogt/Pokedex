import { render, screen } from "@testing-library/react"
import LeftSection from "../LeftSection"

jest.mock("../PokemonInfo", () => ({ infoTitle, infoValue }: { [key: string]: string }) => <div>{infoValue}</div>)
jest.mock("../../../context/pokeContext", () => ({
    usePokeContext: jest.fn().mockReturnValue({
        data: {
            response: [{
                height: "6",
                weight: "85",
                abilities: "blaze",
                shape: "upright",
                generation: "Generation: I"
            }]
        }
    })
}))

describe("LeftSection", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it("testing whether LeftSection is being rendered", () => {
        render(<LeftSection />)
        expect(screen.getByText("blaze")).toBeInTheDocument()
        expect(screen.getByText("Information")).toBeInTheDocument()
    })
})