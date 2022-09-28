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

const scrollToTop = () => {
    scroll.scrollToTop();
};

function App() {
    const { scrollY } = useScroll();
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
