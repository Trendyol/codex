import Layout from "@components/Layout";
import "@styles/globals.css";
import { fetcher } from "@utils/fetcher";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
};

export default App;
