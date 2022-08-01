import { getProviders, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Login = ({ providers }) => {
    const { data: session, status } = useSession()
    
    useEffect(() => {
        console.log("session index", session);
       
  }, [session]);

    return (
        <div>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button 
                        className='bg-[#9825bb] text-white p-5 rounded-full'
                        onClick={() => signIn(provider.id, {callbackUrl: "/" })}
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}