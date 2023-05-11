import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import dataList from "./data/allList";
import { Divider } from "antd";

interface ChooseProps {
    c: string | null;
    setC: (c: string | null) => void;
}
interface PriorityProps {
    cat: string;
    img: string;
    name: string;
}

const CharacterShow = (props: ChooseProps) => {
    const { c } = props;
    type InfoType = (typeof dataList)[0];
    const [info, setInfo] = useState<InfoType | null>(null);
    useEffect(() => {
        const r = dataList.find((character) => character.name == c) || null;
        console.log(r);
        setInfo(r);
    }, [c]);
    const basic = useMemo(() => {
        if (info && info.priority) {
            const r = info.priority.filter((p: PriorityProps) => p.cat == "Stats");
            if (r) {
                return (
                    <>
                        {r.map((p: PriorityProps) => {
                            const sub = p.name.trim().split(" ");
                            return (
                                <div
                                    key={p.name}
                                    className="pl-[20px] flex flex-row h-fit w-fit sm:flex-col sm:w-[120px] justify-evenly"
                                >
                                    <img className="w-[50px] sm:w-[60px]" src={p.img} alt=""></img>
                                    <div className="flex text-[20px] items-center italic text-[#616161]">
                                        <span className="text-black UbuntuBold">{sub[0]}</span>-
                                        {sub[1]}
                                    </div>
                                </div>
                            );
                        })}
                    </>
                );
            }
        }
        return <></>;
    }, [info]);
    const piorityAbilitiesShow = useMemo(() => {
        if (info && info.priority) {
            const r = info.priority.filter((p: PriorityProps) => p.cat == "Abilities");
            if (r) {
                return (
                    <div className="flex flex-col sm:flex-row">
                        {r.map((p: PriorityProps) => {
                            return (
                                <div
                                    key={p.name}
                                    className="flex flex-row h-fit w-fit sm:flex-col sm:w-[120px] justify-evenly"
                                >
                                    <img className="w-[50px] sm:w-[60px]" src={p.img} alt=""></img>
                                    <div className="flex text-[20px] items-center italic text-[#616161]">
                                        <span className="text-black UbuntuBold">{p.name}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            }
        }
        return <></>;
    }, [info]);
    const piorityEidolonsShow = useMemo(() => {
        if (info && info.priority) {
            const r = info.priority.filter((p: PriorityProps) => p.cat == "Eidolons");
            if (r) {
                return (
                    <div className="flex flex-col sm:flex-row">
                        {r.map((p: PriorityProps) => {
                            return (
                                <div
                                    key={p.name}
                                    className="flex flex-row h-fit w-fit sm:flex-col sm:w-[120px] justify-evenly"
                                >
                                    <img className="w-[50px] sm:w-[60px]" src={p.img} alt=""></img>
                                    <div className="flex text-[20px] items-center italic text-[#616161]">
                                        <span className="text-black UbuntuBold">{p.name}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            }
        }
        return <></>;
    }, [info]);
    return info ? (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            {/* basic */}
            <div className="title bg-gradient-to-r from-[#ffcd29] flex ml-[10px] py-[10px] sm:py-[20px] pl-[20px] pr-[60px] w-fit rounded-l-[20px] items-center mt-[40px]">
                <h1 className="inline-block !mr-[20px] text-[16px] sm:text-[20px]">Basic</h1>
            </div>
            <Divider />
            <div className="flex flex-wrap justify-center sm:justify-between">
                <img className="-skew-y-6 drop-shadow-2xl w-[200px]" src={info.img} alt=""></img>
                <div className="flex flex-col w-full sm:w-[750px] px-[20px] justify-end">
                    <h2 className="px-[5px] mt-[50px] sm:mt-[30px] mx-auto sm:ml-[20px] w-fit text-[28px] UbuntuBold tracking-wide border-y-[2px] border-[#ffcd29]">
                        {info.name}
                    </h2>
                    <Divider dashed />
                    <div className="flex flex-col sm:flex-row">{basic}</div>
                </div>
            </div>
            {/* piority */}

            {piorityAbilitiesShow}
            {piorityEidolonsShow}
        </motion.div>
    ) : (
        <></>
    );
};

export default CharacterShow;
