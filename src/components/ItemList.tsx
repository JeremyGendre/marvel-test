import {PropsWithChildren} from "react";

// list affichée dans les "single pages" (comme la page d'un seul personnage, d'une seule série, etc.)
export default function ItemList({children, title}: PropsWithChildren<{title: string}>){
    return (
        <div>
            <div className="font-bold text-2xl">{title}</div>
            <hr className="my-2 border-red-500"/>
            <div>
                {children}
            </div>
        </div>
    );
}

// gestion des valeurs nulles ou vides
export function NoValue({children}: PropsWithChildren<{}>){
    return <span className="italic opacity-75">{children}</span>;
}
