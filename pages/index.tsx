import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react';

import Twitch from "../components/Twitch";
import Layout from '../components/Layout';

const Home: NextPage = () => {

	return (
		<div className='bg-black h-100 w-100 flex'>
			<Layout>
				<Twitch />
			</Layout>
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
