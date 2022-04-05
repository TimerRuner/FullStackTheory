const StrOrNumber: string | number = "2"

//! Type alias - скорочений запис об'єднання опису конкретних типів============================================
type StrOrNumber = string | number

const StrOrNumber1: StrOrNumber = "2"

//? All Js types
type AllJsSimpleTypes =
    | string
    | number
    | []
    | object
    | undefined
    | null
    | boolean
    | void
    | symbol

//! Array types===================================================================================
const tsArra: number[] = [1, 2, 3]
const tsArrayGeneric: Array<number> = [1, 2, 3]

const unionArray: (string | number)[] = [1, 2, "3"] //? - дозволяє створити масиви з вказаними типами одночано
const unionArray2: Array<string | number> = [1, "2", "3"]

//? Tuple - типізація масиву поелементу, сам масив фіксованої довжини стає
const myTuple: [number, string] = [1, "2"]

//! Object ==========================================================================================
type MyObjType = { a: number; b: string }
const myObj: MyObjType = { a: 1, b: "2" }

//? Interface для опису obj
interface MyFirstInterface {
    readonly a: number //? поле не переписується
    b: string
    c?: number[] //? поле не обов'язкове (для взаємодії із полем без помилок ts огортаємо його в if), використовується в крайній необхідності
    e: number | undefined //? поле обов'язкове для декларації, але може бути одного з двої типів
}

const myObj2: MyFirstInterface = {
    a: 2,
    b: "123",
    c: [1],
    e: undefined,
}

if (myObj2.c) {
    const val = myObj2.c
}

//? Index Sygnature ====== для загальної типізації об'єкта із великою к-стю ключів
interface IndexInterface {
    [n: string]: string //? полю зі строчним типом - відповідатиме строчне значення (к-сть полів необмежена)
}

//! Function ==============================================================================================
//? enum - список конкретних значень (без їх задання, значення кожного ключа буде його індекс)
enum Methods {
    add = "add",
    sub = "sub",
}
function calculate(method: Methods, left: number, right: number): number {
    switch (method) {
        case Methods.add:
            return left + right
        case Methods.sub:
            return left - right
        default:
            return 0
    }
}

const sum = calculate(Methods.add, 2, 2)

//? Arrow function =============================
type TypeFn = () => number //? опис функції в типі - зручніше ніж інтерфейс
const ArrowFn: TypeFn = () => 2

interface FnInterface {
    (a: number): void
}
const ArrowFn2: FnInterface = (a) => ""

//! Special TS types ===================================================================================
//? Special TS types
type tsTypes = any | unknown | never

//? any - відключає типізацію змінної (використовувати в крайньому разі)
const some: any = 2

//? unknown - тип підякий не підходить жоден тип (використовується для змінних, тип яких ми дізнаємось пізніше) всі операції з цим типом не спрацюють, доки ми на визначимо тип

const un: unknown = "2"
if (typeof un === "string") {
    un.concat()
}

//? never - функція яка ніколи не виконається до кінця (зациклена функція чи викидання помилки)
function neverFn(): never {
    throw new Error("my exception")
}
