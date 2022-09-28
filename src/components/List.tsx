import {PropsWithChildren} from "react";

export default function List({children} : PropsWithChildren<{}>){
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {children}
        </div>
    );
}
