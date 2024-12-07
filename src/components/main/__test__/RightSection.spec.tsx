import { render, screen } from "@testing-library/react"
import RightSection from "../RightSection"

jest.mock("../PokemonInfo", () => ({ infoValue }: { [key: string]: string }) => <div>{infoValue}</div>)
jest.mock("../../../context/pokeContext", () => ({
    usePokeContext: jest.fn().mockReturnValue({
        data: {
            response: [{
                stats: [
                    { base_stat: 39 },
                    { base_stat: 52 },
                    { base_stat: 43 },
                    { base_stat: 60 },
                    { base_stat: 50 },
                    { base_stat: 65 }
                ]
            }]
        }
    })
}))

describe("RightSection", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it("testing whether RightSection is being rendered", () => {
        render(<RightSection />)
        expect(screen.getByText("Status Base")).toBeInTheDocument()
        expect(screen.getByText(60)).toBeInTheDocument()
    })
})