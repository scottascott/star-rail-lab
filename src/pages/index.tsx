import styles from "./index.module.css";
import { type NextPage } from "next";
import { ConfigProvider } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import CharacterChoose from "./components/characterChoose";
import Logo from "./components/logo";

const Home: NextPage = () => {
    const [c, setC] = useState<string | null>(null);
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#FF9900",
                },
            }}
        >
            <Head>
                <title>Honkai: Star Rail - Mini Lab</title>
                <meta
                    name="description"
                    content="Honkai: Star Rail Mini Labserves as a streamlined and user-friendly web application designed to facilitate access to essential data pertaining to fundamental statistics, Eidolons, Abilities, level up prioritization, and team-related details of a character within the Honkai: Star Rail game."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="max-w-[1080px] mx-auto pt-[30px]">
                <div className="pl-[20px] sm:pl-0 relative w-full">
                    <Logo />
                </div>
                <CharacterChoose c={c} setC={setC} />
            </div>
        </ConfigProvider>
    );
};

export default Home;
