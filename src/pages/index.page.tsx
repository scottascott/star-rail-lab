import styles from "./index.module.css";
import { type NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ConfigProvider, FloatButton } from "antd";
import {
    EllipsisOutlined,
    BarChartOutlined,
    UserSwitchOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import i18nConfig from "next-i18next.config.mjs";

import CharacterChoose from "./components/characterChoose";
import CharacterShow from "./components/characterShow";
import Logo from "./components/logo";
import About from "./components/about";
import Footer from "./components/footer";

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
        router.push("/", "/", {
            locale: locale == "cn" ? "en" : "cn",
            scroll: false,
        });
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
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
            <div className="max-w-[1080px] mx-auto">
                {/* header */}
                <div className="px-[20px] sm:px-[30px] w-full pt-[30px] pb-[30px] fixed sm:relative bg-[#fff7df] z-50 border-b-[1px] sm:border-0 border-[#ffcd29]">
                    <Logo />
                    <div className="w-full text-right pt-[4px] sm:pt-[20px]">
                        <div className="cursor-pointer UbuntuShadow" onClick={changeLang}>
                            {locale == "cn" ? (
                                <>
                                    文<sub>A</sub>
                                </>
                            ) : (
                                <>
                                    A<sub>文</sub>
                                </>
                            )}
                        </div>
                        <div className="cursor-pointer UbuntuShadow" onClick={showModal}>
                            {t("About")}
                        </div>
                    </div>
                </div>
                {/* content */}
                <div className="pt-[100px] sm:pt-0">
                    <CharacterChoose c={c} setC={setCAndRoll} t={t} />
                </div>
                <CharacterShow c={c} setC={setCAndRoll} t={t} />
                {/* footer */}
                <Footer />
            </div>
            {/* float button */}
            {c && (
                <FloatButton.Group
                    trigger="click"
                    type="primary"
                    style={{ right: 24 }}
                    icon={<EllipsisOutlined />}
                >
                    <FloatButton
                        icon={<UserSwitchOutlined />}
                        onClick={() => {
                            router.push("#choose");
                        }}
                    />
                    <FloatButton
                        icon={<BarChartOutlined />}
                        onClick={() => {
                            router.push("#detail");
                        }}
                    />
                    <FloatButton
                        icon={<UsergroupAddOutlined />}
                        onClick={() => {
                            router.push("#team");
                        }}
                    />
                </FloatButton.Group>
            )}
            <About isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} t={t}/>
        </ConfigProvider>
    );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"], i18nConfig, ["en", "cn"])),
    },
});

export default Home;
