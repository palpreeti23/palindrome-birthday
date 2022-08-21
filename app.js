function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfStr = listOfChars.reverse();
    var reverseStr = reverseListOfStr.join('');
    return reverseStr;
 }

function isPalindrome(str){
    var reverse = reverseStr(str);
    return  str === reverse ;
}

function convertDateToStr(date){
     var dateStr = { day: '', month:'', year:''};
    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month< 10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormates(date){
    var dateStr = convertDateToStr(date);
    var DDMMYYYY = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year +  dateStr.month + dateStr.day;
    var DDMMYY = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) +  dateStr.month + dateStr.day;

    return [DDMMYYYY, mmddyyyy, yyyymmdd, DDMMYY, mmddyy, yymmdd];
}

function checkPalindromeForAllFormates(date){

    var listOfFormates = getAllDateFormates(date);
    var flags = false;
    for( let i=0; i<listOfFormates.length; i++){
        if(isPalindrome(listOfFormates[i])){
            flags = true;
            break;
        }
    }
    return flags;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
     if(year%100 === 0){
            return false;
        }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getTheNextDate(date){

    var day = date.day +1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
       if(isLeapYear(year)){
        if(day >29){
            day = 1;
            month++;
        }

       }
       else{
        if(day >28){
            day = 1;
            month++;
        }
       }
    }
    else{
        if(day > daysInMonth[month-1]){
             day = 1;
            month++;
        }
        
    }
    if(month > 12){
        month = 1;
        year++;
    }
    return{
        day : day,
        month : month,
        year : year
    }
}

function getTheNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getTheNextDate(date);
       while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllFormates(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getTheNextDate(nextDate);
    }

    return [ctr, nextDate];
}


const bdayInput = document.querySelector("#bday-input");
const checkBtn = document.querySelector("#check-btn");
const output = document.querySelector("#output");

function clickHandler(e){

    var bdayStr = bdayInput.value;
     if(bdayStr !==''){
        var listOfDates = bdayStr.split('-');
        var date ={
            day : Number(listOfDates[2]),
            month : Number(listOfDates[1]),
            year : Number(listOfDates[0])
        }

        var isPalindrome = checkPalindromeForAllFormates(date)
        if(isPalindrome){
            output.innerText = "Yay! Your Birthday Is A Palindrome!!🥳🥳"
        }
        else{
            var  [ctr, nextDate] = getTheNextPalindromeDate(date);
            output.innerText =`The Next Palindrome Date Is 
            ${nextDate.day}-${nextDate.month}-${nextDate.year}, You Missed It By ${ctr} Days !!!`
        }
     }
    
}

checkBtn.addEventListener("click", clickHandler);


