//! реалізація інкапсуляції без класу
//! --реалізація через об'єкт без інкапсуляції
const User = {
    name: 'Denis',
    getName() {
        return this.name;
    },
    setName(name) {
        this.name = name;
    }
};

//!-- в даному випадку ми створили метод-конструктор і його проблема, що викликані методи в ексемплярі класу можна переопреділити
function User(name) {
    let userName = name;

    return {
        getName() {
            return userName;
        },
        setName(name) {
            userName = name;
        }
    }
}

const denis = new User('Denis');


//!++ забороняємо змінювати об'єкт з методами, який поверта конструктор і не маємо доступу до полів
function User(name) {
    let userName = name;

    return Object.freeze({
        getName() {
            return userName;
        },
        setName(name) {
            userName = name;
        }
    });
}

const denis = new User('Denis');

//! ++ визначаємо назву поля динамічно при об'явлені екземпляра класу
function User(name) {
    const symbol = Symbol();

    return {
        [symbol]: name,
        getName() {
            return this[symbol];
        },
        setName(name) {
            this[symbol] = name;
        }
    }
}

const denis = new User('Denis');
