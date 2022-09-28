import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPages";
import Header from "./components/header/Header";
import ComicsPage from "./pages/ComicsPages";
import SeriesPage from "./pages/SeriesPages";
import { animateScroll as scroll} from 'react-scroll';
import ArrowUpCircleIcon from "./components/icons/ArrowUpCircleIcon";
import useScroll from "./helpers/hooks/useScroll";
import CharacterPage from "./pages/CharacterPage";
import ComicPage from "./pages/ComicPage";
import SeriePage from "./pages/SeriePage";

// simple fonction de scroll top
const scrollToTop = () => {
    scroll.scrollToTop();
};

function App() {
    //on track le scrollY pour afficher ou non le boutton pour remonter en haut
    const { scrollY } = useScroll();

    // ici on gère nos routes et la structure globale de notre app, avec le header, les composants en fonction de la route, etc.
    return (
        <div>
            <Header/>
            <div className="overflow-hidden max-h-[35rem]">
                <img alt="background" src="/background2.jpg" className="w-screen brightness-50" style={{transform: `translateY(${scrollY/30}rem)`}}/>
            </div>
            <div className="p-6">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="characters" element={<CharactersPage />} />
                    <Route path="comics" element={<ComicsPage />} />
                    <Route path="series" element={<SeriesPage />} />
                    <Route path="characters/:id" element={<CharacterPage />} />
                    <Route path="comics/:id" element={<ComicPage />} />
                    <Route path="series/:id" element={<SeriePage />} />
                </Routes>
            </div>
            {scrollY > 0 && (
                <div
                    onClick={scrollToTop}
                    title="Scroll to top"
                    className="fixed bottom-0 right-0 mb-6 mr-4 z-10 text-5xl cursor-pointer text-gray-500 hover:text-gray-300 transition duration-150"
                >
                    <ArrowUpCircleIcon className="w-16 h-16"/>
                </div>
            )}
        </div>
    );
}

export default App;
