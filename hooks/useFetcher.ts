import { useSession } from "next-auth/react";

import twitch from "../pages/api/twitch";

const useFetcher = () => {
    const { data: session, status } = useSession();
	const currentToken = session?.user?.token;

	const fetcher = async(url: string) => {
		return await twitch.get(url, 
			{
				headers: {
					"Authorization": `Bearer ${currentToken}`,
					"Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
				},
			})
			.then((res) => res.data.data)
	}
	return fetcher;
}

export default useFetcher;