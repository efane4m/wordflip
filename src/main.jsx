import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <header>
      <h1>WordFlip</h1>
      <h3>Карточная игра для быстрого изучения слов</h3>
    </header>
    <div class="panelButton">
      <ul>
        <li><a href="">Молоко</a></li>
        <li><a href="">Молоко</a></li>
        <hr></hr>
        <li><a href="">Молоко</a></li>
        <li><a href="">Молоко</a></li>
      </ul>
      <App />
    </div>

  </StrictMode>,
)
