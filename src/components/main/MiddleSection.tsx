import TypePokemon from './TypePokemon';
import LogoPokeball from './LogoPokeball';
import { usePokeContext } from '../../context/pokeContext';


export default function MiddleSection() {
    const { data } = usePokeContext()

    if(data.response == null) return
    const {id, name, sprites, types} = data.response[0]

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
                {types.map(({type}, index: number) => 
                <TypePokemon type={type['name']} key={index} />)}
            </div>
        </section>
    );
};