import LogoPokeball from "../main/LogoPokeball"
import TypePokemon from "../main/TypePokemon"
import { colors } from '../colorPokemon.ts';
import { useEffect, useState } from "react";
import { usePokeContext } from "../../context/pokeContext.tsx";

interface namePokTp {
    name: string
}
interface typePokTp {
    type: namePokTp
}
interface ItemListPokemonProps {
    imgPoke: string,
    namePoke: string,
    typePoke: typePokTp[],
    idPoke: number,
    click: () => void

}
export default function ItemListPokemon({ imgPoke, namePoke, typePoke, idPoke, click }: ItemListPokemonProps) {
    const [selected, setSelected] = useState(false)
    const {data} = usePokeContext()
    useEffect(()=>{
        
        if(data.id == idPoke){
            setSelected(true)
            console.log("selecionou")
            return
        }
        if(selected){
            setSelected(false)
            console.log("removeu")
        }
            
    }, [data])
    return (
        <li
            className="itemListPokemon"
            style={{backgroundColor: colors[typePoke[0]['type']['name']]}}
            onClick={click}>
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