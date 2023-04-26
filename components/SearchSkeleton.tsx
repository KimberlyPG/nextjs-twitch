import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SearchSkeleton = () => {
    return (
        <div className="pt-10 font-roboto mx-10">
            {Array.from({ length: 9 }, (_, i) => (
                <div key={i} className="flex items-center mb-5 lg:ml-10 xs:ml-5">
                    <div className="flex lg:w-1/3 lg:h-1/3 sm:w-1/2 sm:h-1/2 xs:w-full xs:h-full items-center justify-center">
                        <div className='xs:w-16 xs:h-16 lg:w-28 lg:h-28'>
                            <Skeleton circle width="100%" height="100%" baseColor="#202020" highlightColor="#444" />
                        </div>
                    </div>
                    <div className="w-full h-full xs:ml-3 lg:ml-5">
                        <div className='sm:w-[300px] xs:w-full'>
                            <Skeleton width="70%" height={10} baseColor="#202020" highlightColor="#444" />
                            <Skeleton width="90%" height={10} baseColor="#202020" highlightColor="#444" />
                            <Skeleton width="80%" height={10} baseColor="#202020" highlightColor="#444" />
                            <Skeleton width="100%" height={10} baseColor="#202020" highlightColor="#444" />
                        </div>
                    </div>
                </div> 
            ))}
        </div>
    );
}

export default SearchSkeleton;
