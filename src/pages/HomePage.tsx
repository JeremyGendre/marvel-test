import {useCharacters} from "../context/CharactersContext";

export default function HomePage(){
    const {characters, loading} = useCharacters();
    return (
        <div>
            <div>
                {characters.map(char => (
                    <div key={char.id}>{char.name}</div>
                ))}
            </div>
            <div>comics</div>
            <div>series</div>
        </div>
    );
}
