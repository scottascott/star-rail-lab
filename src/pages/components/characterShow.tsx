import { useEffect, useMemo, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { motion, Variants } from "framer-motion";
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

interface TeamMemberProps {
    img: string;
    name: string;
    icon: string;
    des: string;
}

const basicVariants: Variants = {
    offscreen: {
        opacity: 0.5,
    },
    onscreen: {
        opacity: 1,
        // transition: {
        //     type: "spring",
        //     bounce: 0.4,
        // },
    },
};

const CharacterShow = (props: ChooseProps) => {
    const { c, t } = props;
    type InfoType = (typeof dataList)[0];
    const [info, setInfo] = useState<InfoType | null>(null);
    useEffect(() => {
        const r = dataList.find((character) => character.name == c) || null;
        setInfo(r);
    }, [c]);
    const basic = useMemo(() => {
        if (info && info.priority) {
            const r = info.priority.filter((p: PriorityProps) => p.cat == "Stats");
            if (r && r.length > 0) {
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
                                    <div className="flex text-[20px] items-center text-[#616161] sm:justify-center">
                                        <span className="text-black italic UbuntuBold mr-[5px]">
                                            {t(sub[0] || "")}
                                        </span>
                                        {"-"}
                                        <span className="Teko text-[25px] ml-[5px]">
                                            <AnimatedNumbers
                                                animateToNumber={Number(sub[1]) || 0}
                                            ></AnimatedNumbers>
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                );
            }
        }
        return <>{t("Currently No Data")}</>;
    }, [info, t]);
    const piorityAbilitiesShow = useMemo(() => {
        if (info && info.priority) {
            const r = info.priority.filter((p: PriorityProps) => p.cat == "Abilities");
            if (r && r.length > 0) {
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
                                            className={`mx-auto w-[50px] sm:w-[60px] ${
                                                p.name == "Ultiimate" ? "animate-spin" : ""
                                            }`}
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
        return <>{t("Currently No Data")}</>;
    }, [info, t]);
    const piorityEidolonsShow = useMemo(() => {
        if (info && info.priority) {
            const r = info.priority.filter((p: PriorityProps) => p.cat == "Eidolons");
            if (r && r.length > 0) {
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
        return <>{t("Currently No Data")}</>;
    }, [info, t]);
    const [teamState, setTeamState] = useState<number>(-1);
    const teamShow = useMemo(() => {
        if (info && info.priority) {
            const r = info.team;
            if (r && r.length > 0) {
                return (
                    <>
                        <div
                            className="title bg-gradient-to-r from-[#ffcd29] flex ml-[10px] py-[10px] sm:py-[20px] pl-[20px] pr-[60px] w-fit rounded-l-[20px] items-center mt-[40px]"
                            id="team"
                        >
                            <h1 className="inline-block !mr-[20px] text-[16px] sm:text-[20px]">
                                {t("Team")}
                            </h1>
                        </div>
                        <Divider />
                        <div className="flex flex-col  px-[20px]">
                            {r.map((p: TeamMemberProps, index) => {
                                return (
                                    // card
                                    <div
                                        key={index}
                                        className="relative mt-[80px] rounded-[20px] px-[20px] py-[30px] shadow-md w-full h-fit sm:min-h-[160px] outline outline-1 outline-[#ffcd29]"
                                    >
                                        {/* element icon */}
                                        <img
                                            className="w-[40px] absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
                                            src={p.icon}
                                            alt=""
                                        ></img>
                                        {/* image & name */}
                                        <div className="absolute text-center left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 sm:left-[60px] sm:top-1/2 sm:-translate-y-1/2">
                                            <img
                                                className={`${
                                                    teamState == index ? "sepia-0" : "sepia"
                                                } w-[64px] mx-auto mb-[8px] sm:mb-[16px] cursor-pointer`}
                                                src={p.img}
                                                alt=""
                                                onMouseEnter={() => setTeamState(index)}
                                                onMouseLeave={() => setTeamState(-1)}
                                                onClick={() => props.setC(p.name)}
                                            ></img>
                                            <h3>{t(p.name)}</h3>
                                        </div>
                                        {/* des */}
                                        <div className="pt-[30px] sm:pt-0 sm:pl-[160px]">
                                            <p>{t(p.des)}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                );
            }
        }
        return <></>;
    }, [info, t, teamState]);
    return info ? (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            {/* basic */}
            <div
                className="title bg-gradient-to-r from-[#ffcd29] flex ml-[10px] py-[10px] sm:py-[20px] pl-[20px] pr-[60px] w-fit rounded-l-[20px] items-center mt-[40px]"
                id="detail"
            >
                <h1 className="inline-block !mr-[20px] text-[16px] sm:text-[20px]">{t("Basic")}</h1>
            </div>
            <Divider />
            <div className="flex flex-wrap justify-center sm:justify-between">
                <img
                    className="-skew-y-6 drop-shadow-2xl w-[200px] h-fit sm:mt-[30px] ml-0 sm:ml-[30px]"
                    src={info.img}
                    alt=""
                ></img>
                <div className="flex flex-col w-full sm:w-[750px] px-[20px] justify-end">
                    <h2 className="px-[5px] mt-[50px] sm:mt-[30px] mx-auto sm:ml-[20px] w-fit text-[28px] UbuntuBold tracking-wide border-y-[2px] border-[#ffcd29] text-[#ffcd29]">
                        {t(info.name)}
                    </h2>
                    <Divider dashed />

                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ amount: 0.8 }}
                        variants={basicVariants}
                        className="flex flex-col sm:flex-row"
                    >
                        {basic}
                    </motion.div>
                    <Divider dashed />
                    {/* piority */}
                    <h2 className="px-[5px] mb-[40px] mx-auto sm:ml-[16px] w-fit text-[24px] UbuntuBold tracking-wide text-[#616161]">
                        {t("Abilities Priority")}
                    </h2>

                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ amount: 0.8 }}
                        variants={basicVariants}
                        className="flex flex-row flex-wrap w-fit"
                    >
                        {piorityAbilitiesShow}
                    </motion.div>
                    <Divider dashed />
                    {/* piority2 */}
                    <h2 className="px-[5px] mb-[40px] mx-auto sm:ml-[16px] w-fit text-[24px] UbuntuBold tracking-wide text-[#616161]">
                        {t("Eidolons Priority")}
                    </h2>

                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ amount: 0.8 }}
                        variants={basicVariants}
                        className="flex flex-row flex-wrap w-fit"
                    >
                        {piorityEidolonsShow}
                    </motion.div>
                </div>
            </div>
            {/* teamMates */}
            {teamShow}
        </motion.div>
    ) : (
        <></>
    );
};

export default CharacterShow;
