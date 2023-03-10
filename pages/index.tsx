import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react';
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Twitch from "../components/Twitch";
import Layout from '../components/Layout';

const Home: NextPage = () => {
	const { data: session } = useSession();
	const currentUser = session?.user?.name;
	const router = useRouter();

	useEffect(() => {
		if (!session) {
			console.log("Not Authenticated" );
			router.push('/login')
		}
	}, [currentUser, router, session]);

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
