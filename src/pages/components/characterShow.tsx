import { useEffect, useMemo, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
    ssr: false,
});

import dataList from "./data/allList";
import { Divider } from "antd";

interface ChooseProps {
    c: string | null;
    setC: (c: string | null) => void;
    t: (x: string) => string;
}
interface PriorityProps {
    cat: string;
    img: string;
    name: string;
}

const CharacterShow = (props: ChooseProps) => {
    const { c, t } = props;
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
                                    className="pl-[20px] flex flex-row h-fit w-fit sm:flex-col sm:min-w-[120px] justify-evenly"
                                >
                                    <img
                                        className="mx-auto w-[50px] sm:w-[60px]"
                                        src={p.img}
                                        alt=""
                                    ></img>
                                    <div className="flex text-[20px] items-center italic text-[#616161] sm:justify-center">
                                        <span className="text-black UbuntuBold mr-[5px]">
                                            {t(sub[0] || "")}
                                        </span>
                                        {"- "}
                                        <AnimatedNumbers animateToNumber={Number(sub[1])||0}></AnimatedNumbers>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                );
            }
        }
        return <></>;
    }, [info, t]);
    const piorityAbilitiesShow = useMemo(() => {
        if (info && info.priority) {
            const r = info.priority.filter((p: PriorityProps) => p.cat == "Abilities");
            if (r) {
                return (
                    <>
                        {r.map((p: PriorityProps, index) => {
                            return (
                                <>
                                    <div
                                        key={p.name}
                                        className="px-[20px] flex flex-row h-fit w-fit sm:flex-col sm:min-w-[120px] justify-evenly"
                                    >
                                        <img
                                            className={`mx-auto w-[50px] sm:w-[60px] ${p.name=="Ultiimate"?"animate-spin":""}`}
                                            src={p.img}
                                            alt=""
                                        ></img>
                                        <div className="ml-[10px] sm:ml-0 flex text-[20px] items-center italic text-[#616161] sm:justify-center">
                                            <span className="text-black UbuntuBold">
                                                {t(p.name)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-center sm:items-center">
                                        {index != r.length - 1 ? <RightOutlined /> : ""}
                                    </div>
                                </>
                            );
                        })}
                    </>
                );
            }
        }
        return <></>;
    }, [info, t]);
    const piorityEidolonsShow = useMemo(() => {
        if (info && info.priority) {
            const r = info.priority.filter((p: PriorityProps) => p.cat == "Eidolons");
            if (r) {
                return (
                    <>
                        {r.map((p: PriorityProps, index) => {
                            return (
                                <>
                                    <div
                                        key={p.name}
                                        className="px-[20px] flex flex-row h-fit w-fit sm:flex-col sm:min-w-[120px] justify-evenly"
                                    >
                                        <img
                                            className="mx-auto w-[50px] sm:w-[60px]"
                                            src={p.img}
                                            alt=""
                                        ></img>
                                        <div className="ml-[10px] sm:ml-0 flex text-[20px] items-center italic text-[#616161] sm:justify-center">
                                            <span className="text-black UbuntuBold">
                                                {t(p.name)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-center sm:items-center">
                                        {index != r.length - 1 ? <RightOutlined /> : ""}
                                    </div>
                                </>
                            );
                        })}
                    </>
                );
            }
        }
        return <></>;
    }, [info, t]);
    return info ? (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            {/* basic */}
            <div className="title bg-gradient-to-r from-[#ffcd29] flex ml-[10px] py-[10px] sm:py-[20px] pl-[20px] pr-[60px] w-fit rounded-l-[20px] items-center mt-[40px]">
                <h1 className="inline-block !mr-[20px] text-[16px] sm:text-[20px]">{t("Basic")}</h1>
            </div>
            <Divider />
            <div className="flex flex-wrap justify-center sm:justify-between">
                <img
                    className="-skew-y-6 drop-shadow-2xl w-[200px] h-fit sm:mt-[30px]"
                    src={info.img}
                    alt=""
                ></img>
                <div className="flex flex-col w-full sm:w-[750px] px-[20px] justify-end">
                    <h2 className="px-[5px] mt-[50px] sm:mt-[30px] mx-auto sm:ml-[20px] w-fit text-[28px] UbuntuBold tracking-wide border-y-[2px] border-[#ffcd29] text-[#ffcd29]">
                        {t(info.name)}
                    </h2>
                    <Divider dashed />
                    <div className="flex flex-col sm:flex-row">{basic}</div>
                    <Divider dashed />
                    <h2 className="px-[5px] mb-[40px] mx-auto sm:ml-[16px] w-fit text-[24px] UbuntuBold tracking-wide text-[#616161]">
                        {t("Abilities Priority")}
                    </h2>
                    <div className="flex flex-row flex-wrap w-fit">{piorityAbilitiesShow}</div>
                    <Divider dashed />
                    <h2 className="px-[5px] mb-[40px] mx-auto sm:ml-[16px] w-fit text-[24px] UbuntuBold tracking-wide text-[#616161]">
                        {t("Eidolons Priority")}
                    </h2>
                    <div className="flex flex-row flex-wrap w-fit">{piorityEidolonsShow}</div>
                </div>
            </div>
            {/* piority */}
        </motion.div>
    ) : (
        <></>
    );
};

export default CharacterShow;
