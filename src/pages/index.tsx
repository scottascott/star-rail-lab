import styles from "./index.module.css";
import { type NextPage } from "next";
import { ConfigProvider, theme } from "antd";
import Head from "next/head";
import Link from "next/link";

import CharacterChoose from "./components/characterChoose";
import { useState } from "react";

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
            <div>
                <div className="max-w-[1080px] mx-auto pt-[100px]">
                    <CharacterChoose c={c} setC={setC} />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Home;
