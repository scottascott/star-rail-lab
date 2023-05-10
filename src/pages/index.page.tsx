import styles from "./index.module.css";
import { type NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ConfigProvider } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import i18nConfig from "next-i18next.config.mjs";

import CharacterChoose from "./components/characterChoose";
import CharacterShow from "./components/characterShow";
import Logo from "./components/logo";

const Home: NextPage = () => {
    const [c, setC] = useState<string | null>(null);
    const { t } = useTranslation("common");
    const router = useRouter();
    const setCAndRoll = (c: string | null) => {
        setC(c);
        router.push("/#detail_info");
    };
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
            <div className="max-w-[1080px] mx-auto pt-[30px] scroll-smooth">
                <div className="pl-[20px] sm:pl-0 relative w-full">
                    <Logo />
                </div>
                <CharacterChoose c={c} setC={setCAndRoll} />
                <CharacterShow c={c} setC={setCAndRoll} />
            </div>
        </ConfigProvider>
    );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"], i18nConfig, ["en", "cn"])),
    },
});

export default Home;
