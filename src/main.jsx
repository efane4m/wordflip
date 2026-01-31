import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './assets/index.css'

import Home from './pages/Home/Home'
import MyModules from './pages/MyModules/MyModules'
import Profile from './pages/Profile/Profile'
import Settings from './pages/Settings/Settings'
import NotFound from './pages/NotFound/NotFound'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <header>
        <img src="../logo.png" alt="logo" />
        <div>
          <h1>WordFlip</h1>
          <h3>Карточная игра для быстрого изучения слов</h3>
        </div>
      </header>
      <div className="container">
        <div className="panelButton">
          <h3>Основные разделы</h3>
          <hr />
          <NavLink to="/" className="button">Главная</NavLink>
          <NavLink to="/MyModules" className="button">Мои модули</NavLink>
          <NavLink to="/Profile" className="button">Профиль</NavLink>
          <NavLink to="/Settings" className="button">Настройки</NavLink>
        </div>
        <div className="main-content">
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