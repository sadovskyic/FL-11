function maxElement(array) {
    if (array.length) {
        return array.reduce((max, current) => Math.max(max, current));
    }
    return 'Array is empty';
}
const array = [1, 2, 3, 5, 7, 567, 2];
console.group('Task 1');
console.log(maxElement(array));
console.groupEnd();

function copyArray(array) {
    return array.slice();
}
const array2 = [1, 2, 3];
const copiedArray = copyArray(array2);
console.group('Task 2');
console.log(array2, copiedArray);
console.log(array2 === copiedArray);
console.groupEnd();

function addUniqueId(obj) {
    let id = Symbol('id');
    let hasUniqueId = false;
    let copy = {};
    Object.getOwnPropertySymbols(obj).forEach(element => {
        if (Symbol.keyFor(element) === Symbol.keyFor(id)) {
            Object.assign(copy, obj);
            copy[element] = addUniqueId.counter++;
            hasUniqueId = true;
        }
    });
    if (hasUniqueId) {
        return copy;
    }
    copy = Object.assign({ [id]: addUniqueId.counter++ }, obj);
    return copy;
}
addUniqueId.counter = 1;
const obj = { name: 123 };
const objCopy = addUniqueId(obj);
const objCopy2 = addUniqueId(objCopy);
const objCopy3 = addUniqueId(objCopy);
const objCopy4 = addUniqueId(objCopy2);
console.group('Task 3');
console.log(obj);
console.log(objCopy);
console.log(objCopy2);
console.log(objCopy3);
console.log(objCopy4);
console.groupEnd();

function regroupObject(object) {
    let simpleObj = {};
    (function getEntries(obj) {
        for (let [key, value] of Object.entries(obj)) {
            if (typeof value === 'object') {
                getEntries(value);
            } else {
                simpleObj[key] = value;
            }
        }
    })(object);
    let { university, age, name: firstName, id } = simpleObj;
    return {
        university,
        user: {
            age,
            firstName,
            id
        }
    };
}
const oldObj = { name: 'Someone', details: { id: 1, age: 11, university: 'UNI' } };
console.group('Task 4');
console.log(regroupObject(oldObj));
console.groupEnd();

// Didn't use Set because Symbol is the new data type  
// function findUniqueElements(arr) {
//     return [...new Set(arr)];
// }

function findUniqueElements(array) {
    let uniqueSymbolsArray = [];
    let uniqueArray = [];
    array.forEach(element => {
        let num = Symbol.for(element);
        if (uniqueSymbolsArray.length) {
            for (let i = 0; i < uniqueSymbolsArray.length; i++) {
                if (Symbol.keyFor(uniqueSymbolsArray[i]) === Symbol.keyFor(num)) {
                    break;
                }
                if (i === uniqueSymbolsArray.length - 1) {
                    uniqueSymbolsArray.push(num);
                }
            }
        } else {
            uniqueSymbolsArray.push(num);
        }
    });
    for (const element of uniqueSymbolsArray) {
        uniqueArray.push(Number(Symbol.keyFor(element)));
    }
    return uniqueArray;
}
const array3 = [1, 1, 23, 3, 4, 5, 6, 2, 2, 2, 1, 1, 1];
console.group('Task 5');
console.log(array3);
console.log(findUniqueElements(array3));
console.groupEnd();

function hideNumber(phoneNumber) {
    if (typeof phoneNumber !== 'string') {
        phoneNumber = String(phoneNumber);
    }
    const visibleQuantity = 4;
    const visibleNumber = phoneNumber.slice(-visibleQuantity);
    return visibleNumber.padStart(phoneNumber.length, '*');
}
const phoneNumber = '0123456789';
console.group('Task 6');
console.log(hideNumber(phoneNumber));
console.groupEnd();

function add(a = (() => { throw new Error('Missing property') })(), b = (() => { throw new Error('Missing property') })()) {
    return a + b;
}
console.group('Task 7');
console.log(add(1, 3));
try {
    console.log(add(1));
} catch (e) {
    console.error(e);
}
console.groupEnd();

class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}
function getReposNames(username) {
    let url = new URL(`https://api.github.com/users/${username}/repos`);
    let reposNames = [];
    fetch(url)
        .then(
            response => {
                if (response.status !== 200) {
                    throw new HttpError(response);
                } else {
                    return response.json();
                }
            })
        .then(
            myJson => {
                for (const element of myJson) {
                    if (element.name) {
                        reposNames.push(element.name);
                    }
                }
            })
        .catch(err => {
            if (err instanceof HttpError && err.response.status === 403) {
                fetch(url).then(response2 => response2.json()).then(myJson2 => console.log(myJson2.message));
            }
            if (err instanceof HttpError && err.response.status === 404) {
                console.error(`${username} does not exist`);
            } else {
                throw err;
            }
        });
    return reposNames.sort();
}
console.group('Task 8');
console.log(getReposNames('epam'));
console.log(getReposNames('sadovskyic'));
console.groupEnd();

{
    (async () => {
        async function getReposNames(username) {
            let url = new URL(`https://api.github.com/users/${username}/repos`);
            let reposNames = [];
            try {
                let response = await fetch(url);
                if (response.status === 200) {
                    let myJson = await response.json();
                    for (const element of myJson) {
                        if (element.name) {
                            reposNames.push(element.name);
                        }
                    }
                } else {
                    throw new HttpError(response);
                }
            } catch (err) {
                if (err instanceof HttpError && err.response.status === 403) {
                    let response2 = await fetch(url);
                    let myJson2 = await response2.json();
                    console.info(myJson2.message);
                }
                if (err instanceof HttpError && err.response.status === 404) {
                    console.error(`${username} does not exist`);
                } else {
                    throw err;
                }
            }
            return reposNames.sort();
        }
        console.group('Task 9');
        const EPAM = await getReposNames('epam');
        const myProfile = await getReposNames('sadovskyic');
        console.log(EPAM);
        console.log(myProfile);
        console.groupEnd();
    })();
}