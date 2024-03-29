import { FC, ReactNode } from 'react';
import { BsSuitHeart, BsCameraVideo } from "react-icons/bs";
import { useAppSelector } from '../store/hooks';
import { selectToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";

type SidebarContainerProps = {
    title?: string;
    children: ReactNode;
}

const SidebarContainer: FC<SidebarContainerProps> = ({ title = "", children }) => {
    const toggleSidebar = useAppSelector(selectToggle);

    return (
        <>
            <h4 className={`text-sm font-semibold pl-4 xs:hidden ${toggleSidebar ? "lg:flex":"lg:hidden"}`}>{title}</h4>
            {title === "Followed Channels" && 
                <BsSuitHeart className={`text-gray-500 w-full lg:hidden ${toggleSidebar ? "xs:flex":"xs:hidden"}`} />
            }
            {title === "Recommended Channels" &&
                <BsCameraVideo className={`text-gray-500 w-full lg:hidden mt-4 ${toggleSidebar ? "xs:flex":"xs:hidden"}`} />
            }
            <div className={`flex flex-col ${title !== "Recommended Channels" && "max-h-[40%] overflow-y-scroll scrollbar-hide"}  
            ${toggleSidebar ? "lg:max-w-full xs:max-w-[4rem]":"hidden"}`}>
                <div className="border-r border-gray-900">
                    {children}
                </div>
            </div>
        </>
    );
}

export default SidebarContainer;