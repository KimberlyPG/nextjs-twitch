export const recommendationFilter = (id, followed) => {
    let res = false;
    if(followed.length > 0 ){
        followed.forEach((item) => {
            if (item.user_id === id) {
            res = true;
            }
        });
        return res;
    }
};