import ItemListPokemon from "./ItemListPokemon";
import { usePokeContext } from '../../context/pokeContext';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
interface objProps {
    name: string,
    types: [],
    img: string,
    id: number
}

export default function ListPokemons() {
    const { setData } = usePokeContext()
    const [list, setList] = useState<Array<objProps>>([])

    function renderPokemons(start: number, end: number) {
        let allResponses = []
        for (let i = start; i < end; i++) {
            allResponses.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
        }
        Promise.all(allResponses)
            .then(response => {
                let responses = response.map(res => {
                    const { id, name, sprites, types } = res.data
                    return {
                        name,
                        types,
                        img: sprites['other']['official-artwork']['front_default'],
                        id
                    } as objProps;
                })
                setList(previousList => [...previousList, ...responses])
            })
            .catch((error) => {
                console.log(error)
                return
            })
    }

    let spanLoading = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        const observer = new IntersectionObserver((obs) => {
            if (obs[0].isIntersecting) {
                renderPokemons(list.length + 1, list.length + 11)
            }

        });
        if (!spanLoading.current) return
        observer.observe(spanLoading.current)
        return () => {
            observer.disconnect()
        }
    }, [list])

    return (
        <ul className="listPokemonsAside">
            {list.map(({ name, types, img, id }, index) => <ItemListPokemon
                namePoke={name}
                typePoke={types}
                imgPoke={img}
                idPoke={id}
                key={index}
                click={() => { setData(`${id}`)}} />
            )}
            <span ref={spanLoading} className="loader"></span>
        </ul>
    )
}