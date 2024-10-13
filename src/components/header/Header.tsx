import Search from './Search.tsx';

import ButtonPokemon from './ButtomPokemon.tsx';

export default function Header() {
    return (
        <header className='headerPokedex'>
            <ButtonPokemon svgStyle={{transform: "rotate(180deg)"}} button="previous" />
            <Search />
            <ButtonPokemon button="next"/>
        </header>
    );
};

