import 'tailwindcss/tailwind.css';
import '../assets/styles/global.css';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </SessionProvider>
    );
}

export default MyApp;
