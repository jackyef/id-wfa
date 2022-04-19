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
      <div className={clsx('p-8', 'max-w-lg', 'mx-auto')}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default MyApp;
