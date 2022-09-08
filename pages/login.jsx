import { getProviders, signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'

const Login = ({ providers }) => {
    const { data: session } = useSession();
    const router = useRouter();

    if(session){
        router.push('/');
    }  

    return (
        <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
            {Object.values(providers).map((provider) => (
                <div key={provider.name} className="items-center">
                    <button 
                        className='bg-[#9825bb] text-white p-5 rounded-full'
                        onClick={() => signIn(provider.id, {callbackUrl: "/" })}
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}
