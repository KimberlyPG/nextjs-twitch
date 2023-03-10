import React from 'react'
import { BsSuitHeart, BsCameraVideo } from "react-icons/bs";

const SidebarContainer = ({ title, children }) => {
  return (
    <>
        <h4 className="text-sm font-semibold pl-4 xs:hidden lg:grid">{title}</h4>
        {title === "followed" ? (
            <BsSuitHeart className="text-gray-500 lg:hidden w-full" />
        ):(
            <BsCameraVideo className="text-gray-500 lg:hidden w-full mt-4" />
        )}
        <div className="flex flex-col h-2/5 w-80 overflow-y-scroll scrollbar-hide md:max-w-[4rem] lg:max-w-[14rem] xs:max-w-[4rem]">
			<div className="border-r border-gray-900">
				{children}
			</div>
        </div>
    </>
  )
}

export default SidebarContainer;