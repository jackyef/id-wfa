import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {' '}
      <Head>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=G-PL5F6WJMKJ"
            ></Script>
            <Head>
              {/* Global site tag (gtag.js) - Google Analytics */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-PL5F6WJMKJ');`,
                }}
              ></script>
            </Head>
          </>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
