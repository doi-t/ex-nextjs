// `pages/_app.js`
import { AppProps } from 'next/app';
import '../styles/global.css';
import { SessionProvider } from "next-auth/react"
import Context from "../context/context"

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Context>
        <Component {...pageProps} />
      </Context>
    </SessionProvider>
  )
}

export default App;
