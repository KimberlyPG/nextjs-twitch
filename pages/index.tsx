import type { NextPage } from 'next'
import { getSession } from 'next-auth/react';

import Layout from '../components/Layout';
import Twitch from "../components/Twitch";

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
