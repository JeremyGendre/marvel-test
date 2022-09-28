import SearchIcon from "./icons/SearchIcon";

export default function Input({className, ...other}: Partial<JSX.IntrinsicElements['input']>){
    return (
        <div className="flex group border border-transparent border-b-gray-300 hover:border-b-red-500 focus-within:border-b-red-700 transition duration-150">
            <div className="my-auto">
                <SearchIcon/>
            </div>
            <input className={`w-full p-2 outline-none bg-transparent ${className}`} {...other}/>
        </div>
    );
}
