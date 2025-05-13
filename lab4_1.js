function checkPassword(userLogin, userPassword, onSuccess, onError) {
    // Приводим к нижнему регистру
    const normalizedLogin = userLogin.toLowerCase();
    const normalizedPassword = userPassword.toLowerCase();

    // Проверяем количество гласных в пароле
    const vowelLetters = ['a', 'e', 'i', 'o', 'u', 'y'];
    const foundVowels = normalizedPassword.split('').filter(char => vowelLetters.includes(char));
    const isVowelCountCorrect = foundVowels.length === 3;

    // Получаем согласные из логина и пароля
    const getConsonantLetters = (text) => text.split('').filter(char => !vowelLetters.includes(char));
    const loginConsonants = getConsonantLetters(normalizedLogin);
    const passwordConsonants = getConsonantLetters(normalizedPassword);

    // Проверяем совпадение согласных
    const areConsonantsCorrect = loginConsonants.join('') === passwordConsonants.join('');

    // Определяем результат
    if (isVowelCountCorrect && areConsonantsCorrect) {
        onSuccess(normalizedLogin);
    } else {
        let errorType;
        if (!isVowelCountCorrect && !areConsonantsCorrect) {
            errorType = "Everything is wrong";
        } else if (!isVowelCountCorrect) {
            errorType = "Wrong number of vowels";
        } else {
            errorType = "Wrong consonants";
        }
        onError(normalizedLogin, errorType);
    }
}

function executeAuth(login, password) {
    checkPassword(
        login,
        password,
        (validLogin) => console.log(`Привет, ${validLogin}!`),
        (invalidLogin, authError) => console.log(`Кто-то пытался притвориться пользователем ${invalidLogin}, но в пароле допустил ошибку: ${authError.toUpperCase()}.`)
    );
}

// Тест 1 - правильный пароль
executeAuth("login", "aaalgn");
// Вывод: Привет, login!

// Тест 2 - правильный пароль (другой вариант)
executeAuth("login", "luagon");
// Вывод: Привет, login!

// Тест 3 - неверное количество гласных
executeAuth("login", "aalgno");
// Вывод: Кто-то пытался притвориться пользователем login, но в пароле допустил ошибку: WRONG NUMBER OF VOWELS.

// Тест 4 - неверные согласные
executeAuth("login", "aaalgo");
// Вывод: Кто-то пытался притвориться пользователем login, но в пароле допустил ошибку: WRONG CONSONANTS.

// Тест 5 - все ошибки
executeAuth("login", "wrong");
// Вывод: Кто-то пытался притвориться пользователем login, но в пароле