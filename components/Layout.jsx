import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }) => {
    return (
        <div className='flex h-screen w-screen overflow-y-scroll scrollbar-hide bg-black'>
            <Sidebar />
            <div className='flex flex-col h-full w-full'>
                <Topbar />
                <div className='h-full overflow-y-scroll scrollbar-hide'>{children}</div>
            </div>
        </div>
        )
}

export default Layout;