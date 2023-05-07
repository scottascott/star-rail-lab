import { dataIndex } from "./data/index";
interface ChooseProps {
    c: string | null;
    setC: (c: string | null) => void;
}
const CharacterChoose = (props: ChooseProps) => {
    return <div className="flex flex-wrap">
    {dataIndex.map(character=>{
        return <div className="w-[100px]" key={character.name}>
            <img className="w-[80px] mx-auto" src={character.img} alt={character.name}/>
            <p className="block w-full text-center">{character.name}</p>
        </div>
    })}
    </div>;
};
export default CharacterChoose;
