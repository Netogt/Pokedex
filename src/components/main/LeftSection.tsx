import PokemonInfo from "./PokemonInfo";
import { usePokeContext } from '../../context/pokeContext';
export default function LeftSection() {
    const {data} = usePokeContext()
    if(Object.entries(data).length == 0) return
    const {height, weight, abilities, shape, generation} = data
    return (
        <section className="leftSection">
            <h2>Information</h2>
            <div className="boxInformation">
                <PokemonInfo infoTitle="Generation:" infoValue={generation.slice(11).toUpperCase()} />
                <PokemonInfo infoTitle="Shape:" infoValue={shape} />
                <PokemonInfo infoTitle="Height:" infoValue={`${height}0 Cm`} />
                <PokemonInfo infoTitle="Weight:" infoValue={`${weight/10} Kg`} />
                <PokemonInfo infoTitle="Abilities:" infoValue={abilities} />
            </div>
        </section>
    );
};