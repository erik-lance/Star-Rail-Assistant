import '@/styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import type { AppProps } from 'next/app';

// Makes every page use the same layout
// and have inter font
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className={inter.className}>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;