import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './assets/index.css'

import Home from './pages/Home'
import MyModules from './pages/MyModules'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <header>
        <h1>WordFlip</h1>
        <h3>Карточная игра для быстрого изучения слов</h3>
      </header>
      <div class="container">
        <div class="panelButton">
          <h3>Основные разделы</h3>
          <hr />
          <Link to="/" class="button">Главная</Link>
          <Link to="/MyModules" class="button">Мои модули</Link>
          <Link to="/Profile" class="button">Профиль</Link>
          <Link to="/Settings" class="button">Настройки</Link>
        </div>
        <div class="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MyModules" element={<MyModules />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>,
)