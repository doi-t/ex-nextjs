// `pages/_app.js`
import { AppProps } from 'next/app';
import '../styles/global.css';
import { SessionProvider } from "next-auth/react"

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App;
