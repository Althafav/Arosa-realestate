import HeadComponent from "@/components/HeadComponent";
import LayoutComponent from "@/components/LayoutComponent";
import PageLoader from "@/components/UI/Loaders/PageLoader";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutComponent>
      <Head>
        <HeadComponent />
      </Head>
      <PageLoader />
      <Component {...pageProps} />
    </LayoutComponent>
  );
}
