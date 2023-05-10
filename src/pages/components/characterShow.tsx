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
                                    className="flex flex-row h-fit w-fit sm:flex-col sm:w-[120px] justify-evenly"
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
    return info ? (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            id="detail_info"
        >
            {/* basic */}
            <div className="title flex py-[20px] pl-[20px] pr-[60px] w-fit rounded-r-[50px] items-center mt-[40px]">
                <h1 className="inline-block !mr-[20px] text-[16px] sm:text-[20px]">Basic</h1>
            </div>
            <Divider />
            <div className="flex flex-wrap justify-center sm:justify-between">
                <img className="-skew-y-6 w-[200px]" src={info.img} alt=""></img>
                <div className="flex flex-col w-full sm:w-[750px] px-[20px] justify-end">
                    <h2 className="mt-[20px] text-center sm:text-left text-[28px] UbuntuBold">
                        {info.name}
                    </h2>
                    <Divider dashed />
                    <div className="flex flex-col sm:flex-row">{basic}</div>
                </div>
            </div>
        </motion.div>
    ) : (
        <></>
    );
};

export default CharacterShow;
