import { useLocation, useNavigate } from "react-router-dom";
import {useCallback, useMemo} from "react";
import {DEFAULT_LIMIT} from "../../models/Pagination";

// hook permettant d'utiliser la pagination dans l'url
// ex : je veux voir les comics de la page 15. Avoir la pagination dans l'url permet de retourner directement à la bonne page si on a fermé l'onglet par exemple
export default function usePagination(){
    const location = useLocation();
    const navigate = useNavigate();
    const urlLimit = useMemo(() => {
        const urlParams = new URLSearchParams(location.search);
        const limit = urlParams.get('limit');
        if(limit) return parseInt(limit);
        return DEFAULT_LIMIT;
    },[location.search]);

    const urlPage = useMemo(() => {
        const urlParams = new URLSearchParams(location.search);
        const page = urlParams.get('page');
        if(page) return parseInt(page);
        return 1;
    },[location.search]);

    const updateLimit = useCallback((newLimit: number) => {
        const urlParam = new URLSearchParams(location.search);
        urlParam.set('limit', newLimit.toString());
        navigate({search: urlParam.toString()});
    },[location.search]);

    const updatePage = useCallback((newPage: number) => {
        const urlParam = new URLSearchParams(location.search);
        urlParam.set('page', newPage.toString());
        navigate({search: urlParam.toString()});
    },[location.search]);

    const updatePagination = (page: number, limit: number = DEFAULT_LIMIT) => {
        updateLimit(limit);
        updatePage(page);
    };
    return { limit : urlLimit, page: urlPage, updatePagination};
}
