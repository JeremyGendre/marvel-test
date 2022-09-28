import {PropsWithChildren, HTMLAttributes} from "react";


interface Props extends HTMLAttributes<HTMLButtonElement>{
    rounded?: boolean;
    active?: boolean;
    otherClasses?: string;
    disabled?: boolean;
}

export default function Button({children, rounded, active, otherClasses, disabled, ...other} : PropsWithChildren<Props>){
    return (
        <button
            className={`flex p-2 ${rounded ? 'rounded-full' : ''} ${active ? 'bg-[rgba(100,100,100,0.4)]' : ''} transition duration-150 ${!disabled ? 'hover:bg-[rgba(100,100,100,0.4)]' : 'opacity-50 cursor-default'} ${otherClasses}`}
            {...other}
        >
            <div className="m-auto">{children}</div>
        </button>
    );
}
