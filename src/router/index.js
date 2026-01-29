import React from 'react'
import ReactDOM from 'react-dom'
import { BrowseRouter, BrowserRouter } from 'react-router-dom'
import Main from '../main'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)