import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function TwitchSkeleton() {
    return (
        <div className="flex md:p-5 w-full">
            <div className='pt-2 w-full'> 
                <div className='lg:w-[15%] sm:w-[40%] xs:w-[60%]'>
                    <Skeleton width="100%" height={13} baseColor="#202020" highlightColor="#444" className='md:mb-5 xs:mb-3' />  
                </div>     
                <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div key={i} className="mb-10 h-full w-full">
                            <div className='mx-1 xl:w-[98%] 3xl:[248px] 2xl:h-[200px] xl:h-[178px] lg:h-[141px] md:h-[241px] xs:h-[228px]'> 
                                <Skeleton width="100%" height="100%" baseColor="#202020" highlightColor="#444" />
                            </div>
                            <div className="flex">  
                                <div className='h-10 my-2 mr-2'>
                                    <Skeleton circle width={50} height={50} baseColor="#202020" highlightColor="#444" />
                                </div>
                                <span className="w-full truncate m-2">
                                    <Skeleton count={2} baseColor="#202020" highlightColor="#444" />
                                </span>
                            </div>   
                        </div>
                    ))}
                </div>
                <div className='lg:w-[15%] sm:w-[40%] xs:w-[60%]'>
                    <Skeleton width="100%" height={13} baseColor="#202020" highlightColor="#444" className='md:mb-5 xs:mb-3' />  
                </div>  
                <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div key={i} className="mb-10 h-full w-full">
                            <div className='mx-1 xl:w-[98%] 3xl:[248px] 2xl:h-[200px] xl:h-[178px] lg:h-[141px] md:h-[241px] xs:h-[228px]'> 
                                <Skeleton width="100%" height="100%" baseColor="#202020" highlightColor="#444" />
                            </div>
                            <div className="flex">  
                                <div className='h-10 my-2 mr-2'>
                                    <Skeleton circle width={50} height={50} baseColor="#202020" highlightColor="#444" />
                                </div>
                                <span className="w-full truncate m-2">
                                    <Skeleton count={2} baseColor="#202020" highlightColor="#444" />
                                </span>
                            </div>   
                        </div>
                    ))}
                </div>
                <div className="xs:pt-2 w-full">
                    <h2 className="md:pb-5 xs:pb-3 xs:pl-2 font-semibold xs:text-xs md:text-lg">Top Games</h2> 
                    <div className="grid grid-flow-col 3xl:grid-cols-9 2xl:grid-cols-9 xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 xs:grid-cols-4
                    auto-cols-[minmax(0,_0fr)] w-full">
                        {Array.from({ length: 9 }, (_, i) => (
                            <div key={i} className="relative cursor-pointer mb-5 mx-1 w-full 2xl:h-[200px] xl:h-[160px] lg:h-[175px] md:h-[227px] sm:h-[195px] xs:h-[100px]">
                                <Skeleton width="90%" height="100%" baseColor="#202020" highlightColor="#444" className='object-contain h-full w-full' />
                                <Skeleton width="80%" height={10} baseColor="#202020" highlightColor="#444" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default TwitchSkeleton;
