import { Html, Head, Main, NextScript } from 'next/document';

// Set the theme class before first paint to avoid a flash. Defaults to dark.
// The spatial routes ('/' and '/spatial') are dark-only by design — they have no
// theme toggle — so force dark there regardless of any stored 'light' preference
// (localStorage is shared across branches/routes on the same origin, and the
// editorial /work pages' toggle can persist theme=light). Other routes honor it.
const themeScript = `(function(){try{var p=location.pathname.replace(/\\/$/,'')||'/';var spatial=(p==='/'||p==='/spatial');var t=localStorage.getItem('theme');if(spatial||!t||t==='dark'){document.documentElement.classList.add('dark');}}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#09090d" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
