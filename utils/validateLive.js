export const validateLive = (id, streamerLive) => {
    let res = false;
    if(streamerLive?.length > 0 ){
        streamerLive?.forEach((item) => {
            if (item.user_id === id) {
            res = true;
            }
        });
    return res;
    }
};