import LogoPokeball from "../main/LogoPokeball"
import TypePokemon from "../main/TypePokemon"
import { colors } from '../colorPokemon.ts';
import { useEffect, useState } from "react";
import { usePokeContext } from "../../context/pokeContext.tsx";
import { ItemListPokemonProps } from "../../context/interfaces.ts";

export default function ItemListPokemon({ imgPoke, namePoke, typePoke, idPoke}: ItemListPokemonProps) {
    const [selected, setSelected] = useState(false)
    const {data, setData} = usePokeContext()
    
    useEffect(()=>{
        if(!data.response) return
        if(data.response[0].id == idPoke){
            setSelected(true)
            return
        }
        if(selected){
            setSelected(false)
        }
            
    }, [data])
    return (
        <li
            className="itemListPokemon"
            style={{backgroundColor: colors[typePoke[0]['type']['name']]}}
            onClick={() => {setData(`${idPoke}`)}}>
            <span className="cardSelected" style={ selected ? {display: "block"} : {display: "none"}}></span>
            <div className="secNameType">
                <p>{namePoke}</p>
                {typePoke.map((type, index) => <TypePokemon type={type['type']['name']} key={index} />)}
            </div>
            <div className="secIdImage">
                <span>#{idPoke}</span>
                <img src={imgPoke} alt="imagem pokemon" />
                <LogoPokeball />
            </div>
        </li>
    )
}