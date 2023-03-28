import React from "react";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

/**
 * skeleton for the sidebar component
*/

const SidebarSkeleton = () => {
	return (
		<div className="pt-10 h-screen space-y-5">
			<Skeleton  height={16} baseColor="#202020" highlightColor="#444" />
			<div className="flex flex-col items-center h-2/5 w-80 overflow-y-scroll scrollbar-hide lg:max-w-[14rem] xs:max-w-[4rem] space-y-5">
				{Array.from({ length: 10 }, (_, i) => (
					<div key={i} className="flex flex-row py-2 pl-4 pr-2">
						<Skeleton circle height={32} width={32} baseColor="#202020" highlightColor="#444" />
						<div className="flex flex-col xs:hidden lg:flex space-y-1">
							<Skeleton count={2} width={112} height={13} baseColor="#202020" highlightColor="#444" />
						</div>
						<Skeleton  width={28} height={13} baseColor="#202020" highlightColor="#444" />
					</div>
				))}
			</div>
			<Skeleton  height={16} baseColor="#202020" highlightColor="#444" />
			<div className="flex flex-col items-center h-2/5 w-80 overflow-y-scroll scrollbar-hide lg:max-w-[14rem] xs:max-w-[4rem] space-y-5">
				{Array.from({ length: 10 }, (_, i) => (
					<div key={i} className="flex flex-row py-2 pl-4 pr-2 w-full">
						<Skeleton circle height={32} width={32} baseColor="#202020" highlightColor="#444" />
							<div className="flex flex-col xs:hidden lg:flex space-y-1">
								<Skeleton count={2} width={112} height={13} baseColor="#202020" highlightColor="#444"  />
							</div>
						<Skeleton  width={28} height={13} baseColor="#202020" highlightColor="#444" />
					</div>
				))}
			</div>
	</div>
	);
};

export default SidebarSkeleton;
