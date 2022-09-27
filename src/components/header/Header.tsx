import {Link, LinkProps} from "react-router-dom";
import * as React from "react";

export default function Header(){
    return (
        <header className="text-white text-xl sticky top-0 z-10">
            <nav className={`top-0 left-0 right-0 py-4 flex justify-center absolute`}>
                <ul className="flex space-x-14">
                    <HeaderLink to="/">Home</HeaderLink>
                    <HeaderLink to="/characters">Characters</HeaderLink>
                    <HeaderLink to="/comics">Comics</HeaderLink>
                    <HeaderLink to="/series">Series</HeaderLink>
                </ul>
            </nav>
        </header>
    );
}

function HeaderLink({children, to} : LinkProps & React.RefAttributes<HTMLAnchorElement>) {
    return (
        <Link className="header-link relative hover:text-red-400 transition duration-150 after:bg-red-400" to={to}>
            {children}
        </Link>
    );
}
