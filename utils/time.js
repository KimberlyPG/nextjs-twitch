export function time(duration) {
    const format = duration.replace('h', ':').replace('m', ':').replace('s','');


    if(format.split(":")[2] === undefined) {
        const minutes = format.split(":")[0];
        const seconds = format.split(":")[1];

        if(minutes.length < 2 && seconds < 10 )
            return duration = format.slice(0, 2) + "0" + format.slice(2);

        if(minutes.length === 2 && seconds < 10 )
            return duration = format.slice(0, 3) + "0" + format.slice(3);

        if(format.length < 3) {
            return duration = format.slice(0) + " s";
        }
        else return format;
    }
    else{
        const hours = format.split(":")[0]
        const minutes = format.split(":")[1];
        const seconds = format.split(":")[2];

        if(hours.length == 3) {
            if(minutes < 10 && seconds > 9 ) {
                return duration = format.slice(0, 4) + "0" + format.slice(4);
            }
            if(minutes < 10 && seconds < 10) {
                return duration = format.slice(0, 4) + "0" + format.slice(4, 6) + "0" + format.slice(6);
            }
            if(minutes > 9 && seconds < 10 )
                return duration = format.slice(0, 7) + "0" + format.slice(7);
            else {
                return format;
            }
        }

        if(hours.length == 2) {
            if(minutes < 10 && seconds > 9 ) {
                return duration = format.slice(0, 3) + "0" + format.slice(3);
            }
            if(minutes < 10 && seconds < 10) {
                return duration = format.slice(0, 3) + "0" + format.slice(3, 5) + "0" + format.slice(5);
            }
            if(minutes > 9 && seconds < 10 )
                return duration = format.slice(0, 6) + "0" + format.slice(6);
            else {
                return format;
            }
        }
   
        if(hours.length == 1) {
            if(minutes < 10 && seconds > 9 ) {
                return duration = format.slice(0, 2) + "0" + format.slice(2);
            }
            if(minutes < 10 && seconds < 10) {
                return duration = format.slice(0, 2) + "0" + format.slice(2, 4) + "0" + format.slice(4);
            }
            if(minutes > 9 && seconds < 10 )
                return duration = format.slice(0, 5) + "0" + format.slice(5);
            else {
                return format;
            }
        }

    }
}