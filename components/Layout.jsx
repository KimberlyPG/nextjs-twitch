import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }) => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full'>
                <Topbar/>
                <div>{children}</div>
            </div>
        </div>
        )
}

export default Layout;