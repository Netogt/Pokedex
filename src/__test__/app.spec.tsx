import { render, screen } from "@testing-library/react"
import App from "../App"
import { usePokeContext } from "../context/pokeContext"

jest.mock("../components/header/Header", () => () => <div>Header</div>)
jest.mock("../components/main/RequestError", () => () => <div>RequestError</div>)
jest.mock("../components/main/MainSection", () => () => <div>MainSection</div>)
jest.mock("../components/aside/ListPokemons", () => () => <div>ListPokemons</div>)

jest.mock("../context/pokeContext", () => ({
    usePokeContext: jest.fn()
}))

const mockUsePokeContext = usePokeContext as jest.MockedFunction<typeof usePokeContext>

describe("app", () => {
    it("testing whether the app component is being rendered", () => {
        mockUsePokeContext.mockReturnValue({
            data: {
                response: [{
                    types: [{type: {name: "fire"}}]}
                ]
            }
        } as any)
        render(<App />)

        expect(screen.getByText("Header")).toBeInTheDocument()
        expect(screen.getByText("MainSection")).toBeInTheDocument()
        expect(screen.getByText("ListPokemons")).toBeInTheDocument()
    })

    it("testing whether requestError component is rendered when pokeContext returns an error", () => {
        mockUsePokeContext.mockReturnValue({
            data: {
                response: null,
                error: { status: 404, message: "error"}
            }
        } as any)
        render(<App />)
        
        expect(screen.getByText("RequestError")).toBeInTheDocument()
    })
})