import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './css/index.css'
import './css/header.css'
import './css/main.css'
import './css/aside.css'
import { ContainerContext } from './context/pokeContext.tsx'
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ContainerContext>
      <App />
    </ContainerContext>
  // </StrictMode>,
)
