export default function TypePokemon({ type }: { type: string}) {
   
    return (
        <div className="typePoke" >
            <span>{type}</span>
        </div>
    )
}