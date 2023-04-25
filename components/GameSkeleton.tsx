import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function GameSkeleton() {
    return (
        <div className="sm:p-5 bg-black">
            <div className="flex items-center my-10 m-10">\
                <div className='lg:w-[168px] xs:w-[220px]'>
                    <Skeleton width="100%" height={224} baseColor="#202020" highlightColor="#444" />
                </div>
                <div className='ml-5 lg:w-[300px] xs:w-full'>
                    <Skeleton width="100%" height={40} baseColor="#202020" highlightColor="#444" />
                </div>
            </div>

            <div className='my-5 lg:w-[300px] xs:w-[220px]'>
                <Skeleton width="100%" height={13} baseColor="#202020" highlightColor="#444" />
            </div>
            <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
                {Array.from({ length: 15 }, (_, i) => (
                    <div key={i} className="pb-5 w-full">
                        <div className='mx-1 xl:w-[98%] 3xl:[248px] 2xl:h-[200px] xl:h-[178px] lg:h-[141px] md:h-[241px] xs:h-[228px]'> 
                            <Skeleton width="100%" height="100%" baseColor="#202020" highlightColor="#444" />
                        </div>
                        <div className="flex">  
                            <div className='h-10 my-2 mr-2'>
                                <Skeleton circle width={50} height={50} baseColor="#202020" highlightColor="#444" />
                            </div>
                            <div className="w-full truncate m-2">
                                <Skeleton count={2} baseColor="#202020" highlightColor="#444" />
                            </div>
                        </div>   
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameSkeleton;
