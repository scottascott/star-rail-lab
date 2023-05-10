import { type AppType } from "next/dist/shared/lib/utils";

import { appWithTranslation } from "next-i18next";
import nextI18nConfig from "../../next-i18next.config.mjs";

import "~/styles/globals.css";
import 'antd/dist/reset.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

const I18nApp = appWithTranslation(MyApp, nextI18nConfig);
export default I18nApp;
