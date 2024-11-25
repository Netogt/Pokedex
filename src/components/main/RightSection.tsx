import PokemonInfo from './PokemonInfo';
import { usePokeContext } from '../../context/pokeContext';
import { pokemonType } from '../../context/interfaces';
export default function RightSection() {
    const {data} = usePokeContext()
    if(data.response == null) return
    const [hp, attack, defense, spAttack, spDefense, speed ] =( data.response[0] as pokemonType).stats
    return (
        <section className='rightSection'>
            <h2>Status Base</h2>
            <div className="boxInformation">
                <PokemonInfo infoTitle="HP:" infoValue={hp['base_stat']} />
                <PokemonInfo infoTitle="Attack:" infoValue={attack['base_stat']} />
                <PokemonInfo infoTitle="Defense:" infoValue={defense['base_stat']} />
                <PokemonInfo infoTitle="Sp. Attack:" infoValue={spAttack['base_stat']} />
                <PokemonInfo infoTitle="Sp. Defense:" infoValue={spDefense['base_stat']} />
                <PokemonInfo infoTitle="Speed:" infoValue={speed['base_stat']} />
            </div>
        </section>
    )
}
