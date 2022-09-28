import {PropsWithChildren} from "react";

export default function Error({children}: PropsWithChildren<{}>) {
    return (<div className="text-xl text-red-400 text-center">{children} :(</div>);
}
