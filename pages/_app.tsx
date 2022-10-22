/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";

// Third-party imports
import { SessionProvider } from "next-auth/react";
import { apolloClient } from "@graphql/client";
import { Session } from "next-auth";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// App imports
import Navbar from "@components/navbar";
import "../globals.css";

/* ––
 * –––– App declaration
 * –––––––––––––––––––––––––––––––––– */
function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>Lankit - Full stack app | Alexis Lo</title>
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
