function ask_password(login, password, success, failure) {
    // Приводим логин и пароль к нижнему регистру для единообразия
    const normalizedLogin = login.toLowerCase();
    const normalizedPassword = password.toLowerCase();

    // Проверяем количество гласных в пароле (должно быть ровно 3)
    const vowelChars = ['a', 'e', 'i', 'o', 'u', 'y']; // Все возможные гласные
    const passwordVowels = [...normalizedPassword].filter(c => vowelChars.includes(c));
    const hasCorrectVowelCount = passwordVowels.length === 3;

    // Функция для извлечения согласных из строки
    const extractConsonants = s => [...s].filter(c => !vowelChars.includes(c));
    // Получаем последовательности согласных из логина и пароля
    const loginConsonantSeq = extractConsonants(normalizedLogin).join('');
    const passwordConsonantSeq = extractConsonants(normalizedPassword).join('');

    // Проверяем, совпадают ли согласные в логине и пароле
    const consonantsMatch = loginConsonantSeq === passwordConsonantSeq;

    // Обрабатываем результат проверки
    if (hasCorrectVowelCount && consonantsMatch) {
        // Если все условия выполнены - вызываем success
        success(normalizedLogin);
    } else {
        // Определяем тип ошибки
        let errorType;
        if (!hasCorrectVowelCount && !consonantsMatch) {
            errorType = "Everything is wrong"; // Ошибка и в гласных, и в согласных
        } else if (!hasCorrectVowelCount) {
            errorType = "Wrong number of vowels"; // Неправильное количество гласных
        } else {
            errorType = "Wrong consonants"; // Согласные не совпадают
        }
        // Вызываем failure с соответствующим сообщением об ошибке
        failure(normalizedLogin, errorType);
    }
}

function main(login, password) {
    // Основная функция, вызывающая ask_password с обработчиками успеха и ошибки
    ask_password(
        login,
        password,
        // Обработчик успешной авторизации
        (user) => console.log(`Привет, ${user}!`),
        // Обработчик ошибки авторизации
        (user, err) => console.log(`Кто-то пытался притвориться пользователем ${user}, но в пароле допустил ошибку: ${err.toUpperCase()}.`)
    );
}

// Тестовые случаи:

// 1. Корректный пар
