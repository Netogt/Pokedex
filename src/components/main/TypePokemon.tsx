interface TypePokemonProps {
    type: string
}
export default function TypePokemon({ type }: TypePokemonProps) {
   
    return (
        <div className="typePoke" >
            <span>{type}</span>
        </div>
    )
}