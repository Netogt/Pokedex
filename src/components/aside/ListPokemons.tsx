import ItemListPokemon from "./ItemListPokemon";
import { usePokeContext } from '../../context/pokeContext';
import { useEffect, useRef, useState } from "react";
import { listPokemonType} from "../../context/interfaces";
import usePokemon from "../../hooks/useFetch";

export default function ListPokemons() {
    const { setData } = usePokeContext()
    const [list, setList] = useState<Array<listPokemonType>>([])
    const { setPokemonDT } = usePokemon()

    function renderPokemons(start: number, end: number) {
        setPokemonDT({
            type: "list",
            fetch: {
                listPokemon: {
                    start: start,
                    end: end
                }
            }
        }).then(data => {
            if(data.response != null){
                setList(previous => [...previous, ...(data.response as any)])
            }
        })
      
    }

    let spanLoading = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver((obs) => {
            if (obs[0].isIntersecting) {
                renderPokemons(list.length + 1, list.length + 11)
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
            {list.map(({ name, types, sprites, id }, index) => <ItemListPokemon
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