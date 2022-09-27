import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPages";
import Header from "./components/header/Header";
import ComicsPage from "./pages/ComicsPages";
import SeriesPage from "./pages/SeriesPages";
import {useScroll} from '@jeremygendre/react-custom-hooks';

function App() {
    const { scrollY } = useScroll();
    return (
        <div className="bg-gray-900 text-gray-200">
            <Header/>
            <div className="overflow-hidden max-h-96">
                <img src="/background.jpg" className="w-screen brightness-50" style={{transform: `translateY(${scrollY/50}rem)`}}/>
            </div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="characters" element={<CharactersPage />} />
                <Route path="comics" element={<ComicsPage />} />
                <Route path="series" element={<SeriesPage />} />
            </Routes>
        </div>
    );
}

export default App;
