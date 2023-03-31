import { SessionProvider } from "next-auth/react"
import Head from 'next/head';
import type { AppProps } from 'next/app'

import { Provider } from 'react-redux';
import { store } from '../store/store';

import '../styles/globals.css'

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {

  return(
	<>
		<Head>
			<title>Twitch</title>
			<meta
				name="description"
				content="See live streams, follow and search streamers, visit games categories and watch old twitch streams"
			/>
		</Head>
		<SessionProvider session={session}>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</SessionProvider>
	</>
  )
}

export default MyApp;
