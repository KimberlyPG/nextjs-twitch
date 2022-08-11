import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react';
import Main from "../components/Main";
import Layout from '../components/Layout';

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  if (!session) {
    console.log("Not Authenticated" );
  }
  return (
    <div className='bg-black h-100 w-100 flex'>
      <Layout>
        <Main/>
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

export default Home

