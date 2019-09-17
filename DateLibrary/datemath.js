function isDateValid (dt) { //"2020-10-10"
    var dataArr = dt.split("-"); 
    var date    = new Date (Number(dataArr[0]), Number(dataArr[1]) - 1, Number(dataArr[2]));
    if ((date.getFullYear() == dataArr[0]) && (date.getMonth() == dataArr[1] - 1) && date.getDate() == dataArr[2]) {
        return true;
    } else {
        return false;
    }
    //return true or false
} 

function dateDifference (dt1, dt2) {
    if(isDateValid(dt1) && isDateValid(dt2)) {
        var yearA   = Number(dt1.substring(0,4));                                    
        var monthA  = Number(dt1.substring(5,7));          
        var dayA    = Number(dt1.substring(8,10));          
        var yearB   = Number(dt2.substring(0,4));                                                 
        var monthB  = Number(dt2.substring(5,7));            
        var dayB    = Number(dt2.substring(8,10));          
        var dateA   = new Date (yearA, monthA - 1, dayA);
        var dateB   = new Date (yearB, monthB - 1, dayB);
        var result  = Math.round((dateB - dateA)/(1000*60*60*24));
        return result;    
    } else {
        var wrongDate = document.getElementById("Test2Result").innerHTML = "One of those dates are not valid!";
        return wrongDate;
    }
    //return integer
}

function dateAdd (dt1, ndays) {
    var yearA       = Number(dt1.substring(0,4));                                   
    var monthA      = Number(dt1.substring(5,7));       
    var dayA        = Number(dt1.substring(8,10));
    var date        = new Date (yearA, monthA - 1, dayA);
    var dateNumber  = Number(date.getDate()) + Number(ndays);
    var newDate     = new Date (yearA, monthA - 1, dateNumber);
    var yearRet     = newDate.getFullYear();                                   
    var monthRet    = newDate.getMonth() + 1;       
    var dayRet      = newDate.getDate();
    var complete    = "" + yearRet + "-" + monthRet + "-" + dayRet;
    return complete;
    //return date
}

/* Function 1
    //var box = document.getElementById("date1").value;
    /*
    var year = Number(dt.substring(0,4));                                     
    var month = Number(dt.substring(5,7));
    var day = Number(dt.substring(9,10));

    var monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (month <= 12 && day <= 31) {
        var date = new Date (year, month - 1, day);
        if (date != "Invalid Date") {
            if (date.substring(11,15) != year || date.substring(4,7) != monthArr[month]) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
    
    /*
    if (month <= 12 && day <= 31) {
        if (Date.UTC(year, month - 1, day) !== NaN) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
     /*if (dataArr[1].length == 2 && dataArr[2].length == 2) {
        return true;
    } else {
        return false;
    }

*/

/* Function 2
    var paramsArr = [dt1, dt2];
    for (var ctr = 0; ctr < 2; ctr++) {
        var year = Number(paramsArr[ctr].substring(0,4));                                     
        var month = Number(paramsArr[ctr].substring(5,7));
        var day = Number(paramsArr[ctr].substring(9,10));
        if (ctr = 0) {
            var dateA = new Date (year, month - 1, day);
        } else if (ctr = 1) {
            var dateB = new Date (year, month - 1, day);
        } else {
            return;
        }
    }

    console.log(dateA);
    console.log(dateB);
*/    