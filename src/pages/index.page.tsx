import styles from "./index.module.css";
import { type NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ConfigProvider, FloatButton } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import i18nConfig from "next-i18next.config.mjs";

import CharacterChoose from "./components/characterChoose";
import CharacterShow from "./components/characterShow";
import Logo from "./components/logo";

const Home: NextPage = () => {
    const [c, setC] = useState<string | null>(null);
    const { t } = useTranslation("common");
    const router = useRouter();
    const { locale } = router;
    const setCAndRoll = (c: string | null) => {
        setC(c);
        router.push("#detail");
    };
    const changeLang = () => {
        router.push('/', '/', {
            locale: locale == "cn" ? "en" : "cn",
            scroll: false,
        });
    };
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#ffcd29",
                },
            }}
        >
            <Head>
                <title>{t("title")}</title>
                <meta
                    name="description"
                    content="Honkai: Star Rail Mini Labserves as a streamlined and user-friendly web application designed to facilitate access to essential data pertaining to fundamental statistics, Eidolons, Abilities, level up prioritization, and team-related details of a character within the Honkai: Star Rail game."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="max-w-[1080px] mx-auto pt-[30px]">
                <div className="px-[20px] sm:px-[30px] relative w-full">
                    <Logo />
                    <div className="w-full text-right pt-[8px] sm:pt-[20px] cursor-pointer">
                        <div className="UbuntuShadow" onClick={changeLang}>
                            文<sub>A</sub>
                        </div>
                    </div>
                </div>
                <CharacterChoose c={c} setC={setCAndRoll} t={t} />
                <div id="detail">
                    <CharacterShow c={c} setC={setCAndRoll} />
                </div>
            </div>
            <FloatButton.BackTop icon={<SmileOutlined />} type="primary" />
        </ConfigProvider>
    );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"], i18nConfig, ["en", "cn"])),
    },
});

export default Home;
