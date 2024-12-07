import { render, screen } from "@testing-library/react"
import PokemonInfo from "../PokemonInfo"

describe("PokemonInfo", () => {
    it("testing whether PokemonInfo is being rendered", () => {
        render(<PokemonInfo  infoTitle="Height:" infoValue="100 cm"/>)
        expect(screen.getByText("Height:"))
        expect(screen.getByText("100 cm"))
    })
})