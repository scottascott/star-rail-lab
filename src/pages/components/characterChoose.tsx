import { motion } from "framer-motion";
import { Input, Divider } from "antd";

import dataIndex from "./data/index";
import { useState } from "react";

const { Search } = Input;
interface ChooseProps {
    c: string | null;
    setC: (c: string | null) => void;
    t: (x: string) => string;
}

const container = {
    visible: {
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

const CharacterChoose = (props: ChooseProps) => {
    const { t } = props;
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
            <div className="title flex py-[20px] pl-[20px] pr-[60px] w-fit rounded-r-[50px] items-center mt-[60px] sm:mt-[80px]">
                <h1 className="inline-block !mr-[20px] text-[16px] sm:text-[20px]">
                    {t("Characters")}
                </h1>
                <Search
                    placeholder="enter name to search"
                    onChange={handleChange}
                    style={{ width: 200 }}
                />
            </div>
            <Divider />
            <motion.ul
                className="flex flex-wrap justify-center px-[10px]"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {dataShow.map((character) => (
                    <motion.li
                        className="w-[80px] h-[113px] sm:w-[100px] sm:h-[142px]"
                        key={character.name}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            props.setC(character.name);
                        }}
                        variants={item}
                    >
                        <img
                            className={`w-[64px] sm:w-[80px] mx-auto ${
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
                            {t(character.name)}
                        </p>
                    </motion.li>
                ))}
            </motion.ul>
        </>
    );
};
export default CharacterChoose;
