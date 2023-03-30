import { FC, ReactNode } from "react";

import Sidebar from './Sidebar';
import Topbar from './Topbar';

import { SWRConfig } from 'swr';
import useFetcher from '../hooks/useFetcher';

type LayoutProps = {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const fetcher = useFetcher();
    return (
        <SWRConfig value={{  refreshInterval: 120000, fetcher }} >
        <div className='flex h-screen w-screen overflow-y-scroll scrollbar-hide bg-black'>
            <Sidebar />
            <div className='flex flex-col h-full w-full'>
                <Topbar />
                <div className='h-full overflow-y-scroll scrollbar-hide'>{children}</div>
            </div>
        </div>
        </SWRConfig>
    );
}

export default Layout;