import {useEffect, useState} from "react";

type ScrollData = {
    scrollX: number,
    scrollY: number
};

/**
 * Un des hook que j'ai créé, que je réutilise ici
 * @see https://github.com/JeremyGendre/react-custom-hooks#usescroll
 */
export default function useScroll(){
    const [data, setData] = useState<ScrollData>({
        scrollX: 0,
        scrollY: 0
    });

    useEffect(() => {
        const onScroll = () => {
            setData({
                scrollX: window.scrollX,
                scrollY: window.scrollY
            });
        };

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    },[]);

    return data;
}
