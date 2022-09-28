import {useEffect, useState} from "react";
import useDebounce from "./useDebounce";

// simplifie l'utilisation du hook useDebounce
export default function useDebounceValue(value = '') {
    const [debouncedValue, setDebouncedValue] = useState("");

    const debouncedValueCallback = useDebounce((newValue) => {
        setDebouncedValue(newValue);
    }, 500);

    useEffect(() => {
        debouncedValueCallback(value);
    }, [value, debouncedValueCallback]);

    return debouncedValue;
}
