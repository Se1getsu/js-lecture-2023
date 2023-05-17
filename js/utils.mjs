export function shuffle(arr) {
    let n = arr.length;

    while (n) {
        const i = Math.floor(Math.random() * n--);
        const temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
