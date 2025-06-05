// Объявляем функцию readConfig, которая принимает имя конфига и callback-функцию
function readConfig (name, callback) {
    // Имитируем асинхронную операцию с помощью setTimeout
    setTimeout(() => {
        // Выводим сообщение о загрузке конфига
        console.log('(1) config from ' + name + ' loaded')
        // Вызываем callback-функцию после завершения
        callback()
    }, Math.floor(Math.random() * 1000)) // Случайная задержка от 0 до 999 мс
}

// Функция для выполнения SQL-запроса (аналогичная структура)
function doQuery (statement, callback) {
    setTimeout(() => {
        console.log('(2) SQL query executed: ' + statement)
        callback()
    }, Math.floor(Math.random() * 1000))
}

// Функция для HTTP-запроса
function httpGet (url, callback) {
    setTimeout(() => {
        console.log('(3) Page retrieved: ' + url)
        callback()
    }, Math.floor(Math.random() * 1000))
}

// Функция для чтения файла
function readFile (path, callback) {
    setTimeout(() => {
        console.log('(4) Readme file from ' + path + ' loaded')
        callback()
    }, Math.floor(Math.random() * 1000))
}

// Финальная callback-функция
function callback () {
    console.log('It is done!')
}

// Начало выполнения программы
console.log('start');

// Вызываем первую асинхронную функцию readConfig
readConfig("myConfig", function() {
    // После ее завершения вызываем doQuery
    doQuery('select * from cities', function() {
        // После запроса делаем HTTP-запрос
        httpGet('http://google.com', function() {
            // Затем читаем файл
            readFile('README.md', function() {
                // В конце вызываем финальный callback
                callback();
                // И выводим сообщение о завершении
                console.log('end');
            });
        });
    });
});

// Альтернативный вариант (закомментирован) с именованными функциями вместо анонимных
/*
console.log('start');

// Объявляем функцию-обертку для readConfig
function notifyReadConfig() {
    readConfig("myConfig", notifyDoQuery);
}

// Функция-обертка для doQuery
function notifyDoQuery() {
    doQuery('select * from cities', notifyHttpGet);
}

// Функция-обертка для httpGet
function notifyHttpGet() {
    httpGet('http://google.com', notifyReadFile);
}

// Функция-обертка для readFile
function notifyReadFile() {
    readFile('README.md', function() {
        callback();
        console.log('end');
    });
}

// Запускаем цепочку вызовов
notifyReadConfig();
*/
