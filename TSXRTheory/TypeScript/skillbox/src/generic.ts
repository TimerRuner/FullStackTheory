//Generic
//?  Generic як аргументи у функцій, interface знає, який тип підставити в декларування, коли ми його задаємо, що дає гнучкість при налаштуванні
interface MyArray<T> {
    [n: number]: T
    map<U>(fn: (el: T, index: number, arr: MyArray<T>) => U): MyArray<U> //? в залежності від типу повернених даних із cb, масив, що повернеться, буде даного тип, незважаючи на ти el, який ми передали в callback
}

const myArray: MyArray<number> = [1, 2, 3]

let variable = myArray[1] //number

//! типізація map
myArray.map((f, index, arr) => f + 1)
myArray.map((f) => `f + ${f}`)

//! Example 2 ===================================
//? для функції identity неважливо з яким типом ми працюємо, це визнчається в момент ініціалізації чи передачі параметра
function identiry<T>(arg: T): T {
    return arg
}

//! Example 3 =====================================
//? Функція працює лише із T, яке розширяє тип масив (важливо уточнити, бо не кожен тип має властивість length)
function getLen<T extends Array<any>>(arr: T): number {
    return arr.length
}

//! Example 4 =====================================
interface IValueWithType<T> {
    type: string
    value: T
}

//?generic T в інтерфейсі визначиться в момент передачі парметра в функцію, так як це задекларує U від якого залежить T
function withType<U>(arg: U): IValueWithType<U> {
    return {
        type: typeof arg,
        value: arg,
    }
}

//! Встроєні Generic ========================================
interface IExample<T> {
    type: string
    value: T
    isEmpty: boolean
}

//? Omit<interface, removeValue> -- дженерік, який видаляє поля із інтерфейсу
const omittedObject: Omit<IExample<string>, "isEmpty" | "value"> = {
    type: "adgs",
}

//? Pick - дженерік для копіювання полів (використовується для наслідування інтерфейсів), для стоврення нового без
const picked: Pick<IExample<number>, "isEmpty"> = {
    isEmpty: true,
}

//? Partial - добавляє кожній властивості в інтерфейсі ? для створення необов'язковості полів (небезпечний, так як на кожне необов'язкове поле має бути if десь в коді)
const partial: Partial<IExample<object>> = {}
