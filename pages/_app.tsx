import "../styles/globals.scss";
import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { Header as HeaderProps } from "@/interfaces/Header";
import { Footer as FooterProps } from "@/interfaces/Footer";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Error } from "@/components/Error";

type DefaultPageProps = AppProps["pageProps"];

interface CustomPageProps extends DefaultPageProps {
  error?: boolean;
  header?: HeaderProps;
  footer?: FooterProps;
}
interface CustomAppProps extends AppProps {
  pageProps: CustomPageProps;
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      {pageProps.error ? (
        <Error />
      ) : (
        <div>
          {pageProps?.header?.data?.attributes && (
            <Header {...pageProps.header.data.attributes} />
          )}
          <Component {...pageProps} />
          {pageProps?.footer?.data?.attributes && (
            <Footer {...pageProps.footer.data.attributes} />
          )}
        </div>
      )}
    </>
  );
}

export default MyApp;
