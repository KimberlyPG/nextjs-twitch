export function viewersformat(num) {
    if (num > 900) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' k';
    }
    if(num >= 10000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' m';
    }
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' g';
     }
    else return num;
}