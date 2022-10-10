import Head from "next/head";
import Layout from "../components/Layout";
import { SiteProvider } from "../components/SiteContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SiteProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SiteProvider>
  );
}

export default MyApp;
