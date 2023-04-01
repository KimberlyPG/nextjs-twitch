import type { NextPage } from 'next'
import { getSession } from 'next-auth/react';

import Twitch from "../components/Twitch";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

const Home: NextPage = () => {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session?.error === "RefreshAccessTokenError") {
			signIn();
		}
	}, [session]);

	return (
		<Twitch />
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
