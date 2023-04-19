import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileSkeleton = () => {
  return (
    <>
        <Skeleton width="100%" height={450} baseColor="#202020" highlightColor="#444" />
        <div>
            <div className='pl-3'>
                <Skeleton width={80} height={13} baseColor="#202020" highlightColor="#444" className='p-1' />
            </div>
            <div className='flex flex-row items-center m-5'>
                <Skeleton circle width={70} height={70} baseColor="#202020" highlightColor="#444" />
                <Skeleton width={100} height={13} baseColor="#202020" highlightColor="#444" className='ml-5' />
            </div>
            <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
                {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="pb-5 w-full">
                        <div className='mx-1 xl:w-[98%] 3xl:[248px] 2xl:h-[200px] xl:h-[178px] lg:h-[141px] md:h-[241px] xs:h-[228px]'> 
                            <Skeleton width="100%" height="100%" baseColor="#202020" highlightColor="#444" />
                        </div>
                        <div className="flex">  
                            <span className="w-full truncate m-1">
                                <Skeleton count={2} baseColor="#202020" highlightColor="#444" />
                            </span>
                        </div>   
                    </div>
                ))}
            </div>
        </div>
    </>
  );
}

export default ProfileSkeleton;
