import { FC, ReactNode } from "react";
import { useRouter } from "next/router";

import Sidebar from './Sidebar';
import Topbar from './Topbar';

import { SWRConfig } from 'swr';
import useFetcher from '../hooks/useFetcher';

type LayoutProps = {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const fetcher = useFetcher();
    const router = useRouter();
    console.log(router.pathname)
    return (
        <SWRConfig value={{  refreshInterval: 120000, fetcher }} >
            <div className='flex bg-black text-white font-roboto'>
                <Sidebar />
                <div className='flex h-screen flex-col h-full w-full'>
                    <Topbar />
                    {router.pathname === "/following/live" ? (
                        children
                    ):(
                        <div className='h-full overflow-y-scroll scrollbar-hide'>{children}</div>
                    )}
                </div>
            </div>
        </SWRConfig>
    );
}

export default Layout;
