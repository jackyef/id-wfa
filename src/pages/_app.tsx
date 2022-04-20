import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import clsx from 'clsx';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {' '}
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
