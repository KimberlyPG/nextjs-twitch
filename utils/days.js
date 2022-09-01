const today = new Date();

export function days(videoDate, videoDuration){
    const date1 = today.getTime();
    const date2 = videoDate.slice(0, -10)

    const duration = parseFloat(videoDuration.slice(0, -4).replace("h", "."));
    console.log("duration", duration);

    const milliseconds = date1 - new Date(date2).getTime();
    const ndays = Math.round(milliseconds/(1000 * 3600 * 24));
    const hours = Math.round(milliseconds/(1000 * 60 * 60) - duration);

    if(hours < 24) {
        return hours + " hours ago";
    } else {
        return ndays + " days ago";
    }
}
