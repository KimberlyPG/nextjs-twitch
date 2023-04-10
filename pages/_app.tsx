import { SessionProvider } from "next-auth/react"
import Head from 'next/head';
import type { AppProps } from 'next/app'
import { useRouter } from "next/router";

import { Provider } from 'react-redux';
import { store } from '../store/store';
import Layout from "../components/Layout";
import '../styles/globals.css'
import { FilterProvider } from "../context/filter.context";

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
	const router = useRouter();

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
					<FilterProvider>
					{router.pathname === "/login" ? (
						<Component {...pageProps} />
					):(
						<Layout>
							<Component {...pageProps} />
						</Layout>
					)}
					</FilterProvider>
				</Provider>
			</SessionProvider>
		</>
	);
}

export default MyApp;
