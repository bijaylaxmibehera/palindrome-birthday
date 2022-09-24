//function to reverse a string
function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
  }
  // console.log(reverseStr("hello"));
  
  //function to check a string is palindrome or not
  
  function isPalindrome(str) {
    var reverse = reverseStr(str);
  
    return str === reverse;
  }
  // console.log(isPalindrome('racecar'));
  
  function convertDateToStr(date) {
    var dateStr = { day: '', month: '', year: '' };
    if (date.day < 10) {
      dateStr.day = "0" + date.day;
    } else {
      dateStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateStr.month = "0" + date.month;
    } else {
      dateStr.month = date.month.toString();
    }
  
    dateStr.year = date.year.toString();
    return dateStr;
  }
  
//   var dateObj = {
//     day: 2,
//     month: 2,
//     year: 2020
//   }
  // console.log(convertDateToStr(dateObj))
  
  function getAllDateFormat(date) {
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  // console.log(getAllDateFormat(dateObj));
  
  function checkPalindromeForAllDateFormat(date) {
    var listOfAllDateFormat = getAllDateFormat(date);
    var flag = false;
    for (let i = 0; i < listOfAllDateFormat.length; i++) {
      if (isPalindrome(listOfAllDateFormat[i])) {
        flag = true;
        break;
      }
    }
    return flag;
  }
  // console.log(checkPalindromeForAllDateFormat(dateObj));
  
  
  //check leap year
  function isLeapYear(year) {
    if (year % 400 === 0 || year % 100 === 0 || year % 4 === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  function getNextDate(date) {
    var day = date.day+1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month == 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    }
    else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  var dateObj = {
    day: 12,
    month: 2,
    year: 2021
  }
  // console.log(getNextDate(dateObj))

  
function getNextPalindromeDate(date) {
  var count=0;
  var nextDate=getNextDate(date);
  while (1) {
    count++;
    var isPalindromeDate=checkPalindromeForAllDateFormat(nextDate);
    if(isPalindromeDate){
      break;
    }
    nextDate=getNextDate(nextDate);
  }

  return [count,nextDate];
}

// console.log(getNextPalindromeDate(dateObj))

var dateInput=document.querySelector("#date-input");
var showBtn=document.querySelector("#show-btn");
var outputBox=document.querySelector("#output-box");

function clickHandler() {
  var bdayStr=dateInput.value;
  if (bdayStr!='') {
    var listOfDate=bdayStr.split('-');
  }else{
    outputBox.innerText="Date should not be empty"
  }
  var date={
    day:Number(listOfDate[2]),
    month:Number(listOfDate[1]),
    year:Number(listOfDate[0])
  };
  var isPalindrome=checkPalindromeForAllDateFormat(date);
  if (isPalindrome) {
    outputBox.innerText="Yay! Your birthday is a palindrome"
  }
  else{
    var [count, nextDate]=getNextPalindromeDate(date);
    outputBox.innerText= "The next palindrome date is "+nextDate.day+"-"+nextDate.month+"-"+nextDate.year+", you missed it by "+count+" days";
  }
}

showBtn.addEventListener("click",clickHandler)