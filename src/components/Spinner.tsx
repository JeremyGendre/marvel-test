export default function Spinner({text = 'Processing...'}: {text?: string}){
    return (
        <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin h-8 w-8 mr-3 border-4 border-gray-500 rounded-full border-t-gray-100"/>
            {text && <div>{text}</div>}
        </div>
    );
}
