import TypePokemon from './TypePokemon';
import LogoPokeball from './LogoPokeball';
import { usePokeContext } from '../../context/pokeContext';
interface namePokemonType{
    name: string
}
interface typePokemon{
    type: namePokemonType
}

export default function MiddleSection() {
    const { data } = usePokeContext()

    if (Object.entries(data).length == 0) return
    const {id, name, sprites, types} = data
    return (
        <section className='middleSection'>
            <div>
                <p>#{id}</p>
                <h1>{name}</h1>
            </div>
            <div className='boxImage'>
                <img src={sprites} alt="Pokemon Image" />
                <LogoPokeball />
            </div>
            <div className="boxTypes">
                {types.map(({type}: typePokemon, index: number) => 
                <TypePokemon type={type['name']} key={index} />)}
            </div>
        </section>
    );
};