import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPages";
import Header from "./components/header/Header";
import ComicsPage from "./pages/ComicsPages";
import SeriesPage from "./pages/SeriesPages";

function App() {
    return (
        <div>
            <Header/>
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
