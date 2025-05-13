// Асинхронные операции
function squareValue(x, callback) {
    setTimeout(() => callback(x ** 2), Math.random() * 500);
}

function doubleValue(x, callback) {
    setTimeout(() => callback(2 * x), Math.random() * 500);
}

function constantNegativeTwo(x, callback) {
    setTimeout(() => callback(-2), Math.random() * 500);
}

function halveValue(x, callback) {
    setTimeout(() => callback(x / 2), Math.random() * 500);
}

function addFive(x, callback) {
    setTimeout(() => callback(x + 5), Math.random() * 500);
}

function negateValue(x, callback) {
    setTimeout(() => callback(-x), Math.random() * 500);
}

// Основная функция вычисления
function computeCompositeFunction(inputValue, operations, resultHandler) {
    let accumulatedResult = 0;
    let operationIndex = 0;

    function processNextOperation() {
        if (operationIndex >= operations.length) {
            resultHandler(accumulatedResult);
            return;
        }

        const currentOperation = operations[operationIndex];
        currentOperation(inputValue, (operationResult) => {
            const previousValue = accumulatedResult;
            accumulatedResult += operationResult;
            console.log(`Операция ${operationIndex + 1} вернула ${operationResult}, текущая сумма: ${accumulatedResult}`);
            operationIndex++;
            processNextOperation();
        });
    }

    processNextOperation();
}

// Примеры использования:

// a. 2 операции (square + double)
console.log('a. 2 операции (square + double), x = 3');
computeCompositeFunction(3, [squareValue, doubleValue], (total) => {
    console.log(`Итоговый результат: ${total}\n`);
});

// b. 4 операции (square + double + const(-2) + halve)
setTimeout(() => {
    console.log('b. 4 операции (square + double + const(-2) + halve), x = 4');
    computeCompositeFunction(4, [squareValue, doubleValue, constantNegativeTwo, halveValue], (total) => {
        console.log(`Итоговый результат: ${total}\n`);
    });
}, 2000);

// c. 6 операций (все доступные)
setTimeout(() => {
    console.log('c. 6 операций (все доступные), x = 5');
    computeCompositeFunction(5, [squareValue, doubleValue, constantNegativeTwo, halveValue, addFive, negateValue], (total) => {
        console.log(`Итоговый результат: ${total}`);
    });
}, 4000);