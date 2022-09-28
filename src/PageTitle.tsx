import {PropsWithChildren} from "react";

export default function PageTitle({children}: PropsWithChildren<{}>){
    return (
        <h1 className="text-3xl pl-4 border-l-4 border-red-500 mb-8">
            {children}
        </h1>
    );
}
