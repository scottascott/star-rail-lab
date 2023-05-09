import { motion } from "framer-motion";
import { Input,Divider } from "antd";
import { AudioOutlined } from "@ant-design/icons";

import { dataIndex } from "./data/index";
import { useState } from "react";

const { Search } = Input;
interface ChooseProps {
    c: string | null;
    setC: (c: string | null) => void;
}

const CharacterChoose = (props: ChooseProps) => {
    const [dataShow, setDataShow] = useState(dataIndex);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setDataShow(
            dataIndex.filter((character) =>
                character.name.toUpperCase().includes(value.toUpperCase())
            )
        );
    };
    return (
        <>
            <div className="title flex py-[20px] pl-[20px] pr-[60px] w-fit rounded-r-[50px] items-center">
                <h1 className="inline-block !mr-[20px] text-[16px] sm:text-[20px]">Characters</h1>
                <Search
                    placeholder="input search text"
                    onChange={handleChange}
                    style={{ width: 200 }}
                />
            </div>
            <Divider/>
            <div className="flex flex-wrap justify-center px-[10px]">
                {dataShow.map((character) => {
                    return (
                        <motion.div
                            className="w-[100px] h-[142px]"
                            key={character.name}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                props.setC(character.name);
                            }}
                        >
                            <img
                                className={`w-[80px] mx-auto ${
                                    props.c == character.name ? "opacity-100" : "opacity-30"
                                }`}
                                src={character.img}
                                alt={character.name}
                            />
                            <p
                                className={`mt-[10px] block w-full text-center UbuntuMedium ${
                                    props.c == character.name ? "UbuntuBold" : "UbuntuMedium"
                                }`}
                            >
                                {character.name}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </>
    );
};
export default CharacterChoose;
