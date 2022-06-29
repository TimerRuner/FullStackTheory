//! 1=======================
function concat(str1: string, str2: string): string {
    return str1.concat(str2)
}

//! 2 ===========================
interface ArrayObj {
    howIDoIt: string
    simeArray: [string, number]
}
interface IMyHometsk {
    howIDoIt: string
    simeArray: Array<string | number>
    withData: Array<ArrayObj>
}

const MyHometask: IMyHometsk = {
    howIDoIt: "I Do It Wel",
    simeArray: ["string one", "string two", 42],
    withData: [{ howIDoIt: "I Do It Wel", simeArray: ["string one", 23] }],
}

//! 3 ===========================
interface MyArray<T> {
    [n: number]: T
    reduce<U>(
        fn: (accumulator: U, value: T, index: number, array: MyArray<T>) => U,
        initialValue: U
    ): U
}

// const initialValue = 0
// ;[1, 2, 3].reduce((accumulator, value) => accumulator + value, initialValue)

const myArray1: MyArray<number> = [1, 2, 3]
myArray1.reduce((acc, value) => `${acc + value}`, "")

//! 4 ==================================================
interface IHomeTask {
    data: string
    numbericData: number
    date: Date
    externalData: {
        basis: number
        value: string
    }
}

const homeTask: MyPartial<IHomeTask> = {
    externalData: {
        value: "win",
    },
}

type MyPartial<T> = {
    [N in keyof T]?: T[N] extends object ? MyPartial<T[N]> : T[N]
}
