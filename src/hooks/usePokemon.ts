import { useReducer } from "react";
import { pokeAxios } from "./pokeAxios";

export default function usePokemon(){
    function getPokemon(type: string, pokemon: string){
        let allResponses = []
        if(type == "pokemonMain"){
            allResponses = [pokeAxios(`/pokemon/${pokemon}`), pokeAxios(`/species-pokemon/${pokemon}`)]
        }else{

        }
        
        Promise.all()
            .then()
    }
    function setData(pokemon: string | number): void {
        let requests = [`${url}pokemon/${pokemon}`, `${url}pokemon-species/${pokemon}`]
        Promise.all(requests.map(request => axios.get(request)))
            .then(response => {
                const {height, weight, abilities, id, name, sprites, types, stats} = response[0].data
                const {shape, generation} = response[1].data
                setPokemonInfo({
                    height, 
                    weight, 
                    abilities: abilities[0]['ability']['name'], 
                    id, 
                    name, 
                    sprites: sprites['other']['official-artwork']['front_default'], 
                    types, 
                    stats, 
                    shape: shape['name'], 
                    generation: generation['name']
                })
            })
            .catch(error => {
                if(error.status == 404) alert("não foi possivel encontrar esse pokemon")
            })
    }
}