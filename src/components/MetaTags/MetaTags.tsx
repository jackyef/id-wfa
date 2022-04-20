import Head from 'next/head';

export const MetaTags = () => {
  const title = 'Indonesian remote-friendly companies 🇮🇩';
  const description =
    'Job openings for Indonesian companies that offer the perk of working from anywhere.';
  const keywords = 'jobs, work, remote, wfa, indonesia';
  const url = 'https://wfa-id-ten.vercel.app/';
  const ogImage = 'https://wfa-id-ten.vercel.app/og.png';

  /* purple-500 */
  const themeColor = '#a855f7';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:keywords" content={keywords} />
      <meta property="og:image" content={ogImage} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content={url} />
      <meta property="twitter:creator" content="@jackyef__" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:url" content={url} />

      <meta name="theme-color" content={themeColor} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta name="theme-color" content={themeColor} />
    </Head>
  );
};
