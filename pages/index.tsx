import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react';
import Principal from "../components/Principal";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  if (!session) {
    console.log("Not Authenticated" );
  }

  return (
    <div className='bg-black h-100 w-100'>
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

