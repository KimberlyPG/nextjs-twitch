import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react';

import Twitch from "../components/Twitch";
import Layout from '../components/Layout';
import { SWRConfig } from 'swr';
import useFetcher from '../hooks/useFetcher';

const Home: NextPage = () => {
	const fetcher = useFetcher();

	return (
		<div className='bg-black h-100 w-100 flex'>
			<SWRConfig value={{ fetcher }}>
				<Layout>
					<Twitch />
				</Layout>
			</SWRConfig>
		</div>
	);
	}

	export async function getServerSideProps(context: {}) {
	const session = await getSession(context);

		return {
				props: {
					session
				},
			};
		}

	export default Home;
