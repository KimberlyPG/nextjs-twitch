export const time = (duration: string) => {
    const format = duration.replace('h', ':').replace('m', ':').replace('s','');

    if(format.split(":")[2] === undefined) {
        const minutes: string = format.split(":")[0];
        const seconds: number = parseInt(format.split(":")[1]);

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
        const minutes: number = parseInt(format.split(":")[1]);
        const seconds: number = parseInt(format.split(":")[2]);

        if(minutes < 10 && seconds > 9 ) {
            return duration = format.slice(0, hours.length+1) + "0" + format.slice(hours.length+1);
        }
        if(minutes < 10 && seconds < 10) {
            return duration = format.slice(0, hours.length+1) + "0" + format.slice(hours.length+1, 6) + "0" + format.slice(hours.length+3);
        }
        if(minutes > 9 && seconds < 10 )
            return duration = format.slice(0, hours.length+4) + "0" + format.slice(hours.length+4);
        else {
            return format;
        }
    }
}