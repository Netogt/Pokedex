import Header from './components/header/Header.tsx';
import ListPokemons from './components/aside/ListPokemons.tsx';
import MainSection from './components/main/MainSection.tsx';
import { usePokeContext } from './context/pokeContext.tsx';
import { colors } from './components/colorPokemon.ts';

function App() {
  const { data } = usePokeContext()
  if (Object.entries(data).length == 0) return;
  let pokeType = data.types[0]['type']['name']
  return (
    <div className="container" style={{ backgroundColor: colors[pokeType] }}>
      <main>
        <Header />
        <MainSection />
      </main>
      <aside>
        <ListPokemons />
      </aside>
    </div>
  )
}

export default App
