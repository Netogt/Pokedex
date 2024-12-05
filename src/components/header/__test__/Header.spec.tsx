import { render, screen } from "@testing-library/react"
import Header from "../Header"


jest.mock("../Search", () => () => <div>inputSearch</div>)
jest.mock("../ButtonPokemon", () => ({ button}:{ button: string}) => <button>{button}</button>)

describe("Header", () => {
    it("testing whether the Header is being rendered", () => {
        render(<Header />)
        expect(screen.getByText("inputSearch")).toBeInTheDocument()
        expect(screen.getByText("previous")).toBeInTheDocument()
        expect(screen.getByText("next")).toBeInTheDocument()
    })
})