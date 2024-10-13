import LogoPokeball from "../main/LogoPokeball"
import TypePokemon from "../main/TypePokemon"
import { colors } from '../colorPokemon.ts';

interface namePokTp{
    name: string
}
interface typePokTp{
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
  
    return (
        <li className="itemListPokemon" style={{ backgroundColor: colors[typePoke[0]['type']['name']] }} onClick={click}>
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