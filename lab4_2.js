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

console.log('start');

readConfig("myConfig", function() {
    doQuery('select * from cities', function() {
        httpGet('http://google.com', function() {
            readFile('README.md', function() {
                callback();
                console.log('end');
            });
        });
    });
});

// console.log('start');

// function notifyReadConfig() {
//     readConfig("myConfig", notifyDoQuery);
// }

// function notifyDoQuery() {
//     doQuery('select * from cities', notifyHttpGet);
// }

// function notifyHttpGet() {
//     httpGet('http://google.com', notifyReadFile);
// }

// function notifyReadFile() {
//     readFile('README.md', function() {
//         callback();
//         console.log('end');
//     });
// }

// notifyReadConfig();
