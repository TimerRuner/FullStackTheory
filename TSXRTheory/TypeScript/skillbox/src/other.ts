//! as - присвоєння конкретного типу конструкції ========================================================
const mistake = [] as Array<number>
mistake.push(1)
// mistake.push('2') //Error

//! Для типізації (автоматичного створення інтерфейсу) для об'єктів отриманих із мережі використовуємо typeof
type TMyBigObject = typeof serverBigObject

//! Mapped type - типи, які перебирають інші типи ===============================================================
//? ReadOnly
const typeBigObject: Readonly<TMyBigObject> = serverBigObject //? readonly застосується лише для поверхневих ключів
//? Для задання властивості readonly всьому об'єкту (включно внутрішні ключі)

type TObjKeys = keyof TMyBigObject //? отримаємо масив усіх ключів об'єкта
type TCommitType = TMyBigObject

type MyReadonly = {
    readonly [N in keyof TMyBigObject]: TMyBigObject[N] //! на кожній ітерації в N буде ключ об'єкта TMyBigObject, який буде описаний як ключ в типі і значенням буде значення, яке можна оримати по ключу з об'єкта TMyBigObject
}
//? Скорочений варіант за допомогою Generic
type MyReadonly<T> = {
    readonly [N in keyof T]: T[N]
}

const some: MyReadonly<TMyBigObject> = {
    //...
}

//? MyReadonlyDeep =============================================
type MyReadonlyDeep<T> = {
    readonly //? різницею з Readonly є перевірка чи значенням є об'єкт, якщо так то даний об'єкт також огортається в ReadonlyDeep, якщо ні, то попередню умову
    [N in keyof T]: T[N] extends object ? MyReadonlyDeep<T[N]> : T[N]
}

//! MyPick =========================================================
//? T - об'єкт-інтерфейс з яким ми працюємо, K - обмежений значеннями ключів об'єкта T, N -  звичайний ітератор
//? N - біжить по масиву ключів K(тобно ключами будуть ключі даного об'єкта T), а значенням будуть значення T по ключу N
type MyPick<T, K extends keyof T> = {
    [N in K]: T[N]
}

type picked = MyPick<TMyBigObject, "commit" | "commits">

//! Type inference ======================================================================================
type TSomeType = MyReadonlyDeep<TMyBigObject>

//? якщо переданий в дженерік об'єкт був огорнутий MyReadonlyDeep (ми дістаємо даний об'єкт із дженеріка за допомогою 'infer') і повертаємо звичайни об'єкт якщо ні - просто повертаємо переданий об'єкт
type RemoveReadonly<T> = T extends MyReadonlyDeep<infer E> ? E : T

//! Practice ==============================================================================================
function greaterThenZero(a: number) {
    return a > 0
}

//? повернення тип результату невідомої функції
type FnReturnType<T> = T extends (...args: any[]) => infer R ? R : never
//? повернення тип параметрів невідомої функції
type FnParameters<T> = T extends (...args: infer R) => any ? R : never

type TReturnType = ReturnType<typeof greaterThenZero>
type TArgsType = FnParameters<typeof greaterThenZero>
