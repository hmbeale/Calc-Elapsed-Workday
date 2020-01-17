
//'January 17, 20 17:00:00 GMT-05:00'

let dayStart = new Date();
dayStart.setHours(8,0,0,0); //start of workday in local time
const workStart = new Date('November 17, 17 08:00:00 GMT-05:00'); //first workday
const periodStart = new Date('January 10, 20 08:00:00 GMT-05:00'); //since announce

let dayStop = new Date();
dayStop.setHours(17,0,0,0); //end of workday in local time
const workStop = new Date('January 31, 20, 05:00:00 GMT-05:00') //resignation


//takes date objects
//returns total time, elapsed time, remaining time
const genStats = (start, stop) => {
    let res = [];
    startMs = start.getTime();

    res[0] = stop.getTime() - startMs; //total time
    res[1] = Date.now() - startMs; //elapsed time
    res[2] = res[0] - res[1]; //remaining time 
    return res;
}

//just for today
let stats = genStats(dayStart, dayStop);
const workDayMs = stats[0]; //nine hours
const elapsedMs = stats[1];
const remMs = stats[2]; //total ms in workday minus elapsed

console.log(stats[0], stats[1], stats[2])

let longerStats = genStats(workStart, workStop);
const totalMsLonger = longerStats[0];
const elapsedMsLonger = longerStats[1];
const remMsLonger = longerStats[2];

let longStats = genStats(periodStart, workStop);
const totalMsLong = longStats[0];
const elapsedMsLong = longStats[1];
const remMsLong = longStats[2];

const genViz = (elapsed, total, remaining) => {
    let viz = [];
    const scaler = total/36;
    for (let i = 0; i< Math.round(elapsed/scaler); i++){
        viz.push('█');
    }
    for (let i = 0; i< Math.round(remaining / scaler); i++){
        viz.push('░');
    }
    return viz.join('');
}

const barVizArr = genViz(elapsedMs, workDayMs, remMs);
const barVizArrLong = genViz(elapsedMsLong, totalMsLong, remMsLong);
const barVizArrLonger = genViz(elapsedMsLonger, totalMsLonger, remMsLonger);

const reportText = `${remMs}
${remMsLong}
${remMsLonger}
${(Math.round((elapsedMs / workDayMs) * 10000) / 100) + "%"}
${(Math.round((elapsedMsLong/totalMsLong) * 1000000)/10000) + '%'}
${(Math.round((elapsedMsLonger/totalMsLonger) * 100000000)/1000000) + '%'}
${barVizArr}
${barVizArrLong}
${barVizArrLonger}
`

console.log(reportText);

//log
const fs = require('fs');
const logPath = `C:/Users/itdbealh/Documents/cewLogs/${dayStart.getMonth() + 1}-${dayStart.getDate()}-${dayStart.getFullYear()} ${elapsedMs}.txt`

fs.writeFile(logPath, reportText, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("logged successfully");
}); 
