import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import CharactersContextProvider from "./context/CharactersContext";
import ComicsContextProvider from "./context/ComicsContext";
import SeriesContextProvider from "./context/SeriesContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <CharactersContextProvider>
                <ComicsContextProvider>
                    <SeriesContextProvider>
                        <App />
                    </SeriesContextProvider>
                </ComicsContextProvider>
            </CharactersContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If we want to start measuring performance in our app, pass a function, like console.log
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
