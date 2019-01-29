//calculate time as a percentage
const d = new Date();
const h = d.getHours() - 8;
const m = d.getMinutes();
const s = d.getSeconds();
const ms = d.getMilliseconds();
let elapsedMs = (h * 3600000) + (m * 60000) + (s * 1000) + ms;


//lunchbreak in elapsed hours, converted to ms
const lunchStart = 4.5 * 3600000;
const lunchEnd = 5.5 * 3600000;

//accounting for lunchbreak
if (elapsedMs >= lunchStart && elapsedMs <= lunchEnd) {
    elapsedMs = lunchStart;
}
if (elapsedMs > lunchEnd) {
    elapsedMs -= 3600000;
}

console.log((Math.round((elapsedMs / 288000) * 100) / 100) + "%");
