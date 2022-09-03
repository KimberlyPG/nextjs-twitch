import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { BsSuitHeart, BsCameraVideo } from "react-icons/bs";

import SidebarStreamerCard from "./Sidebar-streamer-card";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addStreamerData,
  selectStreamer,
  cleanState,
} from "../store/slices/streamer/streamerSlice";
import { selectFollowedLive } from "../store/slices/followedLive/followedLiveSlice";
import { selectToggle } from "../store/slices/sidebarToggleSlice/sidebarToggleSlice";
import { selectRecommended } from "../store/slices/recommended/recommendedSlice";
import { addData, selectRecommendedUserData } from "../store/slices/recommendedUserData/recommendedUserDataSlice";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const currentToken = session?.user.token;
  
  const [followed, setFollowed] = useState([]);

  const dispatch = useAppDispatch();

  const streamerData = useAppSelector(selectStreamer);
  const streamerLive = useAppSelector(selectFollowedLive);
  const toggleSidebar = useAppSelector(selectToggle);
  const recommendedList = useAppSelector(selectRecommended);
  const recommendedUserData = useAppSelector(selectRecommendedUserData);

  useEffect(() => {
    const getFollowed = async () => {
      if (currentToken) {
        const response = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${userId}&first=50`,
          {
            headers: {
              Authorization: `Bearer ${currentToken}`,
              "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
            },
          }
        ).then((res) => res.json());

        setFollowed(response.data);
      }
    };
    getFollowed();
  }, [currentToken, userId]);

  useEffect(() => {
    dispatch(cleanState([]));
    if (followed) {
      followed.map((streamer) => {
        const streamerId = streamer.to_id;
        const getFollowedInfo = async () => {
          const response = await fetch(`https://api.twitch.tv/helix/users?id=${streamerId}`,
            {
              headers: {
                Authorization: `Bearer ${currentToken}`,
                "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
              },
            }
          ).then((res) => res.json());
          dispatch(addStreamerData(response.data[0]));
        };
        getFollowedInfo();
      });
    }
  }, [currentToken, followed]);

  useEffect(() => {
    recommendedList.map((streamer) => {
    const getStreamerInfo = async() => {
        const information = await fetch(`https://api.twitch.tv/helix/users?id=${streamer.user_id}`,
        {
            headers: {
                "Authorization": `Bearer ${currentToken}`,
                "Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID,
            }
        }
        ).then(res => res.json())
        dispatch(addData(information.data[0]));
    };
    getStreamerInfo();
  });
}, [currentToken, recommendedList]);

  const validateLive = (id) => {
    let res = false;
    if(streamerLive.length > 0 ){
      streamerLive.forEach((item) => {
        if (item.user_id === id) {
          res = true;
        }
      });
    return res;
    }
  };

  return (
    <div>
      {toggleSidebar && (
        <div className="text-white pt-10 h-screen">
          {followed && (
            <>
              <h4 className="text-sm font-semibold pl-4 xs:hidden lg:grid">Followed</h4>
              <BsSuitHeart className="text-gray-500 lg:hidden w-full" />
              <div className="flex flex-col h-2/5 w-80 overflow-y-scroll scrollbar-hide 
                        md:max-w-[4rem] lg:max-w-[14rem] xs:max-w-[4rem]">
                <div className="border-r border-gray-900">
                  {streamerData.map((data) =>
                      validateLive(data.id) === true && (
                        <SidebarStreamerCard
                          key={data.id}
                          id={data.user_id}
                          image={data.profile_image_url}
                          display_name={data.display_name}
                          game_name={streamerLive[streamerLive.findIndex((streamerid) => streamerid.user_id == data.id)].game_name}
                          viewer_count={streamerLive[streamerLive.findIndex((streamerid) => streamerid.user_id == data.id)].viewer_count}
                        />
                      )
                  )}
                  {streamerData.map((data) =>
                      validateLive(data.id) === false && (
                        <SidebarStreamerCard
                          key={data.id}
                          id={data.id}
                          image={data.profile_image_url}
                          display_name={data.display_name}
                        />
                      )
                  )}
                </div>
              </div>
            </>
          )}

          <h1 className="pt-10 pl-4 text-sm font-semibold xs:hidden lg:grid">Recommended</h1>
          <BsCameraVideo className="text-gray-500 lg:hidden w-full mt-4" />
          <div className="flex flex-col h-2/5 w-80 overflow-y-scroll scrollbar-hide
                md:max-w-[4rem] lg:max-w-[14rem] xs:max-w-[4rem]">
            <div className="border-r border-gray-900">
              {recommendedList &&
                recommendedList.map((streamer) => (
                  <SidebarStreamerCard
                    key={streamer.user_id} 
                    id={streamer.user_id} 
                    image={recommendedUserData[recommendedUserData.findIndex((streamerid) => streamerid.id == streamer.user_id)]?.profile_image_url} 
                    display_name={streamer.user_name} 
                    game_name={streamer.game_name} 
                    viewer_count={streamer.viewer_count}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
