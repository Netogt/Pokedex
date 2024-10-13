import { usePokeContext } from "../../context/pokeContext"

interface ButtonPokemonProps {
    svgStyle?: {
        [key: string]: string,
    },
    button: string
}
export default function ButtonPokemon({ svgStyle, button }: ButtonPokemonProps) {
    const { data, setData } = usePokeContext()
    function changePokemon(btn: string) {
        let move: string = '';
        if (btn == 'previous') {
            if (data.id == 1) {
                move = '1025'
            } else {
                move = `${data.id - 1}`
            }
        } else {
            if (data.id == 1025) {
                move = '1'
            } else {
                move = `${data.id + 1}`
            }
        }
        setData(move)
    }
    return (
        <button onClick={() => { changePokemon(button) }}>
            <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 58">
                <path stroke="currentColor" d="M44.25 36.3612L17.25 51.9497C11.5833 55.2213 4.5 51.1318 4.50001 44.5885L4.50001 13.4115C4.50001 6.86824 11.5833 2.77868 17.25 6.05033L44.25 21.6388C49.9167 24.9104 49.9167 33.0896 44.25 36.3612Z"></path>
            </svg>
        </button>
    )
}