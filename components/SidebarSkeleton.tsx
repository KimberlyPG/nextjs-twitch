import React from "react";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

/**
 * skeleton for the sidebar component
*/

const SidebarSkeleton = () => {
	return (
		<div className="pt-10 h-screen space-y-5">
			<div className="flex xs:hidden lg:flex pl-5">
				<Skeleton width={60} height={10} baseColor="#202020" highlightColor="#444" />
			</div>
			<div className="flex flex-col items-center h-2/5 w-80 overflow-y-scroll scrollbar-hide lg:max-w-[14rem] xs:max-w-[4rem]">
				{Array.from({ length: 10 }, (_, i) => (
					<div key={i} className="flex flex-row py-2 pr-2 space-x-1">
						<Skeleton circle height={32} width={32} baseColor="#202020" highlightColor="#444" />
						<div className="flex flex-col xs:hidden lg:flex">
							<Skeleton count={2} width={112} height={13} baseColor="#202020" highlightColor="#444" />
						</div>
						<div className="flex xs:hidden lg:flex">
							<Skeleton  width={28} height={13} baseColor="#202020" highlightColor="#444" />
						</div>
					</div>
				))}
			</div>
			<div className="flex xs:hidden lg:flex pl-5">
				<Skeleton width={60} height={10} baseColor="#202020" highlightColor="#444" />
			</div>
			<div className="flex flex-col items-center h-2/5 w-80 overflow-y-scroll scrollbar-hide lg:max-w-[14rem] xs:max-w-[4rem]">
				{Array.from({ length: 10 }, (_, i) => (
					<div key={i} className="flex flex-row py-2 pr-2 space-x-1">
						<Skeleton circle height={32} width={32} baseColor="#202020" highlightColor="#444" />
							<div className="flex flex-col xs:hidden lg:flex">
								<Skeleton count={2} width={112} height={13} baseColor="#202020" highlightColor="#444"  />
							</div>
							<div className="flex xs:hidden lg:flex">
								<Skeleton  width={28} height={13} baseColor="#202020" highlightColor="#444" />
							</div>
					</div>
				))}
			</div>
	</div>
	);
};

export default SidebarSkeleton;
