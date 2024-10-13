import { useEffect, useRef } from "react";
import { usePokeContext } from "../../context/pokeContext";
export default function Search() {
    const { setData } = usePokeContext()
    const inputSearch = useRef<HTMLInputElement>(null)
    
    useEffect(() => {
        inputSearch.current?.addEventListener("keydown", (event) => {
            if (!inputSearch.current) return;
            if (event.key == "Enter") {
                let value = inputSearch.current.value
                if (value != '') {
                    setData(value)
                    inputSearch.current.value = ''
                }
            }
        })
    }, [])

    return (
        <div className="boxSearch">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <input ref={inputSearch} type="search" name='seachPokemon' placeholder='search by name or id' />
        </div >
    );
}