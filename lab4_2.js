function readConfig (name, callback) {
    setTimeout(() => {
        console.log('(1) config from ' + name + ' loaded')
        callback()
    }, Math.floor(Math.random() * 1000))
}

function doQuery (statement, callback) {
    setTimeout(() => {
        console.log('(2) SQL query executed: ' + statement)
        callback()
    }, Math.floor(Math.random() * 1000))
}

function httpGet (url, callback) {
    setTimeout(() => {
        console.log('(3) Page retrieved: ' + url)
        callback()
    }, Math.floor(Math.random() * 1000))
}

function readFile (path, callback) {
    setTimeout(() => {
        console.log('(4) Readme file from ' + path + ' loaded')
        callback()
    }, Math.floor(Math.random() * 1000))
}

function callback () {
    console.log('It is done!')
}

// Решение с коллбэками (callback hell)
console.log('start 1');
readConfig('myConfig', () => {
    doQuery('select * from cities', () => {
        httpGet('http://google.com', () => {
            readFile('README.md', () => {
                callback();
                console.log('end');
            });
        });
    });
});

// Решение с notification
// console.log('start 2');
//
// const tasks = [
//     { fn: readConfig, args: ['myConfig'] },
//     { fn: doQuery, args: ['select * from cities'] },
//     { fn: httpGet, args: ['http://google.com'] },
//     { fn: readFile, args: ['README.md'] }
// ];
//
// function executeSequentially(tasks, index = 0) {
//     if (index >= tasks.length) {
//         callback();
//         console.log('end');
//         return;
//     }
//
//     const task = tasks[index];
//     task.fn(...task.args, () => {
//         executeSequentially(tasks, index + 1);
//     });
// }
//
// executeSequentially(tasks);