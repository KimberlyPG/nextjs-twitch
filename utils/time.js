export function time(duration) {
    return duration.replace('h', ':').replace('m', ':').replace('s','');
}