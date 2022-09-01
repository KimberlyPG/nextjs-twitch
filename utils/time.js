export function time(duration) {
    return duration.replace('h', ':').replace('m', ':').replace('s','');
    // console.log(duration)
    // // console.log(duration.getMinutes()<10?'0':'');
    // // console.log(duration.substring(duration.indexOf("h") + 1))
    // const minutes = duration.indexOf("h")+2
    // // const seconds = duration.indexOf("m")+1
    // console.log("value",duration[minutes]);
    // console.log("index", minutes -1 );
    // if(duration[minutes] === 'm') {
    //     return console.log("minutes", duration.substring(0, (minutes - 1) ) + duration[minutes]) + duration.substring(minutes, duration.length)
    //  }
    // return duration.replace('h',':') + '0' + replace('m', ':')

    // return console.log(duration);
}