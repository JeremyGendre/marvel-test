import {PropsWithChildren} from "react";

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
