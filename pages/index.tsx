import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react';
import Principal from "../components/Principal";

const Home: NextPage = () => {

  // const { data: getToken } = useSession()
  // console.log(getToken)

  const { data: session, status } = useSession()
  // console.log(session)
  // const user = getSession();
  // console.log("user:",  session?.user);

  if (!session) {
    console.log("Not Authenticated" );
  }

  return (
    <div>
      <Principal />
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

