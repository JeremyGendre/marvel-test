import {useCharacters} from "../context/CharactersContext";
import Card from "../components/Card";
import Spinner from "../components/Spinner";

export default function HomePage(){
    const {characters, loading} = useCharacters();
    return (
        <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {loading ? (
                    <Spinner/>
                ) : (
                    <>
                        {characters.slice(0,6).map(character => (
                            <Card key={character.id} name={character.name} thumbnail={character.thumbnail} link="/"/>
                        ))}
                    </>
                )}
            </div>
            <div>comics</div>
            <div>series</div>
        </div>
    );
}
