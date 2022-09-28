import {useCallback, useRef} from "react";

export default function useDebounce(callback: (...args: any) => void, timeout: number = 300) {
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const callBackRef = useCallback(callback, [callback]);

    return (...args: any) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            callBackRef.apply(null, args);
        }, timeout);
    };
}
