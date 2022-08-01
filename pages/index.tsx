import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react';
import Principal from "../components/Principal";
import Topbar from "../components/Topbar";
import axios from 'axios';

const Home: NextPage = () => {

  // const { data: getToken } = useSession()
  // console.log(getToken)

  // const { data: session, status } = useSession()
  // console.log(session)
  // const user = getSession();
  // console.log("user:",  session?.user);

  // const getToken = () => {
  //   axios.get("https://id.twitch.tv/oauth2/token",
  //   {
  //     headers: {
  //       "content-type": "ap"
  //     }
  //   }
  //   ) 
  // }

  return (
    <div>
      <Topbar />
      <Principal />
      <h1 className="text-3xl font-bold underline">Hello</h1>
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

export default Home

