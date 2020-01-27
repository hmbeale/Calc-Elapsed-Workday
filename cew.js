//todo
//simplify and unify references to current time
//see about conversion getters
//maybe regex to get rid of colons in file path if using time

const dayStart = new Date();
dayStart.setHours(8,0,0,0); //start of workday in local time
const periodStart = new Date('January 10, 20 08:00:00 GMT-05:00'); //since announce
const workStart = new Date('November 17, 17 08:00:00 GMT-05:00'); //first workday

const dayStop = new Date();
dayStop.setHours(17,0,0,0); //end of workday in local time
const workStop = new Date('January 31, 20, 05:00:00 GMT-05:00'); //resignation

const curTime = Date.now();

//takes date objects
//returns total time, elapsed time, remaining time
const genStats = (start, stop, cur) => {
    let res = [];
    startMs = start.getTime();

    const timeTotal = stop.getTime() - startMs; //total time
    const timeElapsed = cur - startMs; //elapsed time
    const timeRemaining = timeTotal - timeElapsed; //remaining time 
    
    res[0] = []; //data visualization bar
    res[1] = Math.round(timeElapsed/timeTotal * 10000 )/100  + '%'; //percent of time elapsed
    res[2] = timeRemaining //remaining ms
    
    const scaler = timeTotal/108; //divisor determines how many bars there are 
    
    for (let i = 0; i< Math.round(timeElapsed/scaler); i++){
        res[0].push('█');
    }
    for (let i = 0; i< Math.round(timeRemaining/scaler); i++){
        res[0].push('░');
    }

    res[0] = res[0].join('');

    return res.join(' ');
}

const cur = new Date();

const reportText = genStats(dayStart, dayStop, curTime) + '\n' + 
                   genStats(periodStart, workStop, curTime) + '\n' +
                   genStats(workStart, workStop, curTime) + '\n' + '\n' +
                   cur;
                   
console.log(reportText);

//log
const fs = require('fs');

fs.writeFile('C:/Users/itdbealh/Documents/cewLogs/' + cur.toDateString() + " " + curTime + '.txt', 
              reportText, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("logged successfully\n");
}); 
