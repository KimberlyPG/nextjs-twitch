import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react';
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Main from "../components/Main";
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
  }, [currentUser]);
  console.log("current user:", currentUser);

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

export default Home;
