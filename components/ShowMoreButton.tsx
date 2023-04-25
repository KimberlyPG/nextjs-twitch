import { FC } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

import Spinner from "./Spinner";

import { StreamersData } from "../types/types";

type ShowMoreProps = {
    size: number;
    recommendationsList: StreamersData[];
    changeSize: () => void;
}

const ShowMoreButton: FC<ShowMoreProps> = ({ size, recommendationsList, changeSize }) => {
  return (
    <button 
        className="flex justify-center text-sm text-purple-500 text-center w-full" 
        onClick={() => changeSize()}
    >
        {size === 1 ? (
                <>
                    Show more
                    <BsArrowDownShort className="text-xl" />
                </>
            ):(
            recommendationsList && !recommendationsList[1]?.data ? (
                <Spinner />
            ):(
                <>
                    Show less
                    <BsArrowUpShort className="text-xl" />
                </>
            )
        )}
    </button>
  )
}

export default ShowMoreButton;
