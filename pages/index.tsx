import type { NextPage } from 'next'
import { getSession } from 'next-auth/react';

import Layout from '../components/Layout';
import Twitch from "../components/Twitch";

const Home: NextPage = () => {
	return (
		<Layout>
			<Twitch />
		</Layout>
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
