import { PokemonInfoProps } from "../../interfaces";

export default function PokemonInfo({infoTitle, infoValue}: PokemonInfoProps) {
    return (
        <div className='itemInfo'>
            <h3>{infoTitle}</h3>
            <p>{infoValue}</p>
        </div>
    );
};