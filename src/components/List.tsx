import {PropsWithChildren} from "react";

// liste dans les pages dédiées (ex: le listing des personnages, listing des comics, etc.)
export default function List({children} : PropsWithChildren<{}>){
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {children}
        </div>
    );
}
