import '../styles/globals.css';
import '../styles/flex.css';
import '../styles/inputs.css';
import '../styles/lists.css';
import '../styles/spacing.css';
import '../styles/stocks.css';
import '../styles/widths.css';
import '../styles/typography.css';
import '../styles/containers.css';
import '../styles/media.css';
import '../styles/render.css';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
