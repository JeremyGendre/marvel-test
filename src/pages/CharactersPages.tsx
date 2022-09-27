import {useCharacters} from "../context/CharactersContext";
import Card from "../components/Card";

export default function CharactersPage(){
    const { pagination, characters, loading, fetchCharacters } = useCharacters();
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {characters.map(character => (
                <Card key={character.id} name={character.name} thumbnail={character.thumbnail} link="/"/>
            ))}
            <div>{pagination.current} | {pagination.max}</div>
        </div>
    );
}
