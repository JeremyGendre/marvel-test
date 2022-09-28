import {PaginationType} from "../models/Pagination";
import Button from "./button/Button";
import ChevronDoubleLeftIcon from "./icons/ChevronDoubleLeftIcon";
import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";
import ChevronDoubleRightIcon from "./icons/ChevronDoubleRightIcon";

// une action par boutton de pagination
interface Props {
    pagination: PaginationType,
    onFirst?: () => void;
    onPrevious?: () => void;
    onNext?: () => void;
    onLast?: () => void;
}

export default function Pagination({pagination, onFirst, onPrevious, onNext, onLast}:Props){
    return (
        <div className="mt-4 mx-auto flex space-x-2">
            <Button rounded disabled={pagination.current === 1} onClick={onFirst}>
                <ChevronDoubleLeftIcon/>
            </Button>
            <Button rounded disabled={pagination.current === 1} onClick={onPrevious}>
                <ChevronLeftIcon/>
            </Button>
            <div className="my-auto">Page {pagination.current} sur {pagination.max}</div>
            <Button rounded disabled={pagination.current === pagination.max} onClick={onNext}>
                <ChevronRightIcon/>
            </Button>
            <Button rounded disabled={pagination.current === pagination.max} onClick={onLast}>
                <ChevronDoubleRightIcon/>
            </Button>
        </div>
    );
}
