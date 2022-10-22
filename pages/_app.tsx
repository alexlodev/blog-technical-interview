import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { apolloClient } from "@graphql/client";
import { Session } from "next-auth";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Navbar from "@components/navbar";
import "../globals.css";
import Footer from "@components/footer";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  if (!pageLoaded) {
    return null;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>Blog</title>
          <meta
            name="description"
            content="Lankit - Full stack app | Alexis Lo"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />
        <AnimatePresence>
          <Component {...pageProps} />
        </AnimatePresence>
        <Toaster position="bottom-center" />
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
