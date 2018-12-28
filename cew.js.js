//calculate time as a percentage
let d = new Date();
let h = d.getHours() -8;
let m = d.getMinutes();
let s = d.getSeconds();
let ms = d.getMilliseconds();
let elapsedMs = (h*3600000) + (m*60000) + (s*1000) + ms;

if (elapsedMs >= 16200000 && elapsedMs<=19800000){
  elapsedMs = 16200000;
}
if (elapsedMs>19800000){
  elapsedMs -=3600000;
}

console.log((Math.round((elapsedMs/288000) * 100) / 100) + "%");
