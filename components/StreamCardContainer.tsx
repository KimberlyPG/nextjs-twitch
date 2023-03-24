import { FC, ReactNode } from "react";

type StreamCardContainerProps = {
    children: ReactNode;
    description: string;
}

const StreamCardContainer: FC<StreamCardContainerProps> = ({ children, description }) => {
  return (
    <div className="xs:pt-2">
        <h2 className="md:pb-5 xs:pb-3 xs:pl-2 font-semibold xs:text-xs md:text-lg">{description}</h2> 
        <div className="grid 3xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
            {children}
        </div>
    </div>
  )
}

export default StreamCardContainer;