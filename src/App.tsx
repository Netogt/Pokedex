import Header from './components/header/Header.tsx';
import ListPokemons from './components/aside/ListPokemons.tsx';
import MainSection from './components/main/MainSection.tsx';
import { usePokeContext } from './context/pokeContext.tsx';
import { colors } from './components/colorPokemon.ts';
import RequestError from './components/main/RequestError.tsx';

function App() {
  const { data } = usePokeContext()
  let pokeType: string = ''
  if(data.response != null)
  pokeType = data.response[0].types[0]['type']['name']

  return (
    <div className="container" style={{ backgroundColor: colors[pokeType] }}>
      <main>
        <Header />
        {data.error? <RequestError /> : <MainSection />}
      </main>
      <aside>
        <ListPokemons />
      </aside>
    </div>
  )
}

export default App
