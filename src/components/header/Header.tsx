import {Link, LinkProps} from "react-router-dom";
import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import useScroll from "../../helpers/hooks/useScroll";

// on définit ici nos liens présents dans le header
const links = [
    {path: '', title: 'Home'},
    {path: '/characters', title: 'Characters'},
    {path: '/comics', title: 'Comics'},
    {path: '/series', title: 'Series'},
];

export default function Header(){
    const {scrollY} = useScroll();
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();

    // récupère le lien actif et update le state
    const checkLocation = (newLocation: {pathname: string}) => {
        let newActiveLink = '';
        for (let i = 0; i < links.length; i++){
            if(links[i].path !== '' && newLocation.pathname.includes(links[i].path)){
                newActiveLink = links[i].path;
                break;
            }
        }
        setActiveLink(newActiveLink);
    };

    // au changement dans l'url, on update le lien actif
    useEffect(() => {checkLocation(location)}, [location]);

    // on gère aussi l'opacité du background en fonction du scroll
    return (
        <header className="text-white text-xl sticky top-0 z-50">
            <nav className="top-0 left-0 right-0 py-4 flex justify-center absolute" style={{backgroundColor:`rgba(0,0,0,${(scrollY/8)/100})`}}>
                <ul className="flex flex-wrap space-x-4 sm:space-x-10 lg:space-x-14">
                    {links.map(link => (
                        <HeaderLink key={link.path} to={link.path} active={link.path === activeLink}>{link.title}</HeaderLink>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

type HeaderLinkProps =  LinkProps & React.RefAttributes<HTMLAnchorElement> & {
    active?: boolean
}

function HeaderLink({children, to, active = false} : HeaderLinkProps) {
    return (
        <Link className={`header-link relative hover:text-red-400 transition duration-150 after:bg-red-400 ${active ? 'header-link-active text-red-400' : ''}`} to={to}>
            {children}
        </Link>
    );
}
