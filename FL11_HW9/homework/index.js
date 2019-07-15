const ONE = 1,
      TWO = 2,
      THREE = 3;
let data = [
    {
      '_id': '5b5e3168c6bf40f2c1235cd6',
      'index': 0,
      ' birthday ': '2016-03-18T00:00:00',
      'eyeColor': 'green',
      'name': 'Stein',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '5b5e3168e328c0d72e4f27d8',
      'index': 1,
      ' birthday ': '1991-02-11T00:00:00',
      'eyeColor': 'blue',
      'name': 'Cortez',
      'favoriteFruit': 'strawberry'
    },
    {
      '_id': '5b5e3168cc79132b631c666a',
      'index': 2,
      ' birthday ': '1984-04-17T00:00:00',
      'eyeColor': 'blue',
      'name': 'Suzette',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '5b5e31682093adcc6cd0dde5',
      'index': 3,
      ' birthday ': '1994-04-17T00:00:00',
      'eyeColor': 'green',
      'name': 'George',
      'favoriteFruit': 'banana'
    }
];
function getNumbers(str) {
    let numbers = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            numbers.push(parseInt(str[i]));
        }
    }
    return numbers;
}
console.log(getNumbers('n1um3ber95'));
function findTypes() {
    let obj = {};
    let key;
    for (let i = 0; i < arguments.length; i++) {
        key = typeof arguments[i];
        if (key in obj) {
            obj[key]++;
        } else {
            obj[key] = 1;
        }
    }
    return obj;
}
console.log(findTypes(null, 'hello'));
function executeforEach(arr = [], func) {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
}
executeforEach([ONE, TWO, THREE], el => console.log(el));
function mapArray(arr, func) {
    let transformedArray = [];
    executeforEach(arr, function(element) {
        transformedArray.push(func(element));
    })
    return transformedArray;
}
console.log(mapArray([ONE, TWO, THREE], function(el) {
    return el + THREE; 
}));
function filterArray(arr, func) {
    let filteredArray = [];
    executeforEach(arr, el => {
        if (func(el)) {
            filteredArray.push(el);
        }
    });
    return filteredArray;
}
console.log(filterArray([ONE, TWO, THREE], el => el > ONE ));
function showFormattedDate(date) {
    let options = {
        month: 'short',
        day: 'numeric'
    };
    return `Date: ${date.toLocaleString('en-US', options)} ${date.getFullYear()}`;
}
console.log(showFormattedDate(new Date('2019-01-27T01:10:00')));
function canConvertToDate(datestring) {
    if (isNaN(Date.parse(datestring))) {
        return false;
    }
    return true;
}
console.log(canConvertToDate('2016-13-18T00:00:00'));
function daysBetween(date1, date2) {
    const millisecondsInSecond = 1000,
          secondsInMinute = 60,
          minutesInHour = 60,
          hoursInDay = 24,
          millisecondsInDay = millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay;
    return Math.round((date2 - date1) / millisecondsInDay);
}
console.log(daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00')));
function getAmountOfAdultPeople(arr) {
    const adultAge = 18,
          daysInYear = 365;
    let adults = filterArray(arr, el => {
        for (let key in el) {
            if (~key.indexOf('birthday')) {
                return daysBetween(new Date(el[key]), Date.now()) > daysInYear * adultAge;
            }
        }        
    });
    return adults.length;   
}
console.log(getAmountOfAdultPeople(data));
function keys(obj) {
    let propNames = [];
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            propNames.push(key);
        }
    }
    return propNames;
}
console.log(keys({keyOne: 1, keyTwo: 2, keyThree: 3}));
function values(obj) {
    let values = [];
    for (let key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) {
            values.push(obj[key]);
        }
    }
    return values;
}
console.log(values({keyOne: 1, keyTwo: 2, keyThree: 3}));