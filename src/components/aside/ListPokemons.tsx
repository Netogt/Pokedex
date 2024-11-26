import ItemListPokemon from "./ItemListPokemon";
import { usePokeContext } from '../../context/pokeContext';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { listPokemonType } from "../../context/interfaces";
import usePokemon from "../../hooks/usePokemon";

export default function ListPokemons() {
    const { setData } = usePokeContext()
    const [list, setList] = useState<Array<listPokemonType>>([])
    const { pokemonDT, setPokemonDT } = usePokemon()

    function renderPokemons(start: number, end: number) {
        setPokemonDT({
            type: "list",
            fetch: {
                listPokemon: {
                    start: start,
                    end: end
                }
            }
        })
        console.log(start, end)
        
        // let allResponses = []
        // for (let i = start; i < end; i++) {
        //     allResponses.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
        // }
        // Promise.all(allResponses)
        //     .then(response => {
        //         let responses = response.map(res => {
        //             const { id, name, sprites, types } = res.data
        //             return {
        //                 name,
        //                 types,
        //                 sprites: sprites['other']['official-artwork']['front_default'],
        //                 id
        //             } as listPokemonType;
        //         })
        //         setList(previousList => [...previousList, ...responses])
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //         return
        //     })
    }

    let spanLoading = useRef<HTMLSpanElement>(null)
    
    useEffect(() => {
        const observer = new IntersectionObserver((obs) => {
            if (obs[0].isIntersecting) {
                renderPokemons(list.length + 1, list.length + 11)
                if(pokemonDT.response){

                    setList(pokemonDT.response)
                    console.log(pokemonDT)
                }
            }

        });
        if (spanLoading.current) {
            observer.observe(spanLoading.current)
        }
       

        return () => {
            observer.disconnect()
        }
    }, [list])

    return (
        <ul className="listPokemonsAside">
            {pokemonDT.response && pokemonDT.response.map(({ name, types, sprites, id }, index) => <ItemListPokemon
                namePoke={name}
                typePoke={types}
                imgPoke={(sprites as any)['other']['official-artwork']['front_default']}
                idPoke={id}
                key={index}
                click={() => { setData(`${id}`) }} />
            )}
            <span ref={spanLoading} className="loader"></span>
        </ul>
    )
}