//! інкапсуляція завдяки модульності (ми обгортаємо експортовані дані в функцію, завдяки чому імпортувавши не зможемо змінювати даний об'єкт)
let data = {
    name: 'Denis'
};

export function getData() {
    return data;
}


//! тепер всі екземпляри класу не зможуть отримати доступ до метода чи властивості завдяки замиканню і 
const symbol = Symbol();

export default class User {
    constructor(firstName) {
        this[symbol] = firstName;
    }

    getFirstName() {
        return this[symbol];
    }
}