// Асинхронные операции

// 1. Функция возведения в квадрат (асинхронная)
function squareValue(x, callback) {
    // Имитация асинхронной операции с задержкой 0-500 мс
    setTimeout(() => callback(x ** 2), Math.random() * 500);
}

// 2. Функция удвоения значения (асинхронная)
function doubleValue(x, callback) {
    setTimeout(() => callback(2 * x), Math.random() * 500);
}

// 3. Функция всегда возвращает -2 (асинхронная)
function constantNegativeTwo(x, callback) {
    setTimeout(() => callback(-2), Math.random() * 500);
}

// 4. Функция деления пополам (асинхронная)
function halveValue(x, callback) {
    setTimeout(() => callback(x / 2), Math.random() * 500);
}

// 5. Функция добавления 5 (асинхронная)
function addFive(x, callback) {
    setTimeout(() => callback(x + 5), Math.random() * 500);
}

// 6. Функция смены знака (асинхронная)
function negateValue(x, callback) {
    setTimeout(() => callback(-x), Math.random() * 500);
}

// Основная функция вычисления композитной функции
function computeCompositeFunction(inputValue, operations, resultHandler) {
    let accumulatedResult = 0;  // Аккумулятор для хранения промежуточных результатов
    let operationIndex = 0;     // Индекс текущей операции

    // Внутренняя рекурсивная функция для обработки операций по очереди
    function processNextOperation() {
        // Если все операции выполнены
        if (operationIndex >= operations.length) {
            resultHandler(accumulatedResult);  // Вызываем финальный обработчик
            return;
        }

        // Получаем текущую операцию по индексу
        const currentOperation = operations[operationIndex];
        
        // Выполняем текущую операцию с входным значением
        currentOperation(inputValue, (operationResult) => {
            // Сохраняем предыдущее значение для отладки (не используется)
            const previousValue = accumulatedResult;
            
            // Добавляем результат операции к аккумулятору
            accumulatedResult += operationResult;
            
            // Выводим информацию о выполнении операции
            console.log(`Операция ${operationIndex + 1} вернула ${operationResult}, текущая сумма: ${accumulatedResult}`);
            
            // Переходим к следующей операции
            operationIndex++;
            
            // Рекурсивный вызов для обработки следующей операции
            processNextOperation();
        });
    }

    // Запускаем цепочку обработки операций
    processNextOperation();
}

// Примеры использования:

// a. Тест с 2 операциями (возведение в квадрат + удвоение)
console.log('a. 2 операции (square + double), x = 3');
computeCompositeFunction(3, [squareValue, doubleValue], (total) => {
    console.log(`Итоговый результат: ${total}\n`);
    // Для x=3: (3²=9) + (2*3=6) = 15
});

// b. Тест с 4 операциями (с задержкой 2 секунды)
setTimeout(() => {
    console.log('b. 4 операции (square + double + const(-2) + halve), x = 4');
    computeCompositeFunction(4, [squareValue, doubleValue, constantNegativeTwo, halveValue], (total) => {
        console.log(`Итоговый результат: ${total}\n`);
        // Для x=4: (16) + (8) + (-2) + (2) = 24
    });
}, 2000);

// c. Тест со всеми 6 операциями (с задержкой 4 секунды)
setTimeout(() => {
    console.log('c. 6 операций (все доступные), x = 5');
    computeCompositeFunction(5, [squareValue, doubleValue, constantNegativeTwo, halveValue, addFive, negateValue], (total) => {
        console.log(`Итоговый результат: ${total}`);
        // Для x=5: (25) + (10) + (-2) + (2.5) + (10) + (-5) = 40.5
    });
}, 4000);
