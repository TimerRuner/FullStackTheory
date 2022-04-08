import React, { DOMElement } from "react"

//! Карірування ==============================================================
const add = (leftSide: number) => (rightSide: number) => leftSide + rightSide

function addEventListenerWithDispose(
    element: Window,
    name: string,
    handler: (e: Event) => void
) {
    element.addEventListener(name, handler)
    return () => element.removeEventListener(name, handler)
}

//? функція для подій із можливістю очистки
const dispose = addEventListenerWithDispose(window, "resize", () => {
    console.log("resize")
    dispose()
})

//? ===============================
const withIdKey = withKey("id")

function Feed(props: { blocks: IBlockProps[] }) {
    return <div>{props.blocks.map(withIdKey(Block))}</div>
}

interface IBlockProps {
    title: string
    id: string
}

function Block(props: IBlockProps) {
    return <div>{props.title}</div>
}

//? E - матиме значення інтерфейсу IBlockProps, T матиме тип компоненти з пропсами типу E, завдяки замиканню, callback для map уже міститиме в собі значення ключа і компоненти
// function withKey(key?: string) {
//     return <E, T extends React.ComponentType<E>>(component: T) =>
//         (props: E, index: number) =>
//             React.createElement(
//                 component,

//                 { ...props, key: key ? props[key as keyof E] : index },
//                 []
//             )
// }

//? ====================================
function Input({
    onChange,
    value,
}: {
    onChange: (value: string) => void
    value: string
}) {
    return <input value={value} onChange={getValue(onChange)} />
}

function Checkbox({
    onChange,
    value,
}: {
    onChange: (value: boolean) => void
    value: boolean
}) {
    return (
        <input
            type="checkbox"
            checked={value}
            onChange={getChecked(onChange)}
        />
    )
}

//? Спрощений функціональний варіант
function pickFromSyntheticEvent<T extends HTMLElement>() {
    return <K extends keyof T>(key: K) =>
        <E extends (t: T[K]) => void>(fn: E) =>
        (e: React.SyntheticEvent<T>) =>
            fn(e.currentTarget[key]) //? виконання onChange з уже преданими і перевіреними параметрами вказаного об'єкта
}

export const getValue = pickFromSyntheticEvent<HTMLInputElement>()("value") //? значення ключа input
export const getChecked = pickFromSyntheticEvent<HTMLInputElement>()("checked") //? значення ключа input

//? ===================================
//? Функція для посилань, які не повинні виконувати дефолтнку поведінку браузера при кліку
function NotStandartLink(props: any) {
    return <a onClick={preventDefault(stopPropagation(props.onClick))}>Hello</a>
}

//? функції приймають функції, які приймають в себе event і поветають функції які приймають event, виконуючи передану раніше функцію
function preventDefault<T extends (e: any) => void>(fn: T) {
    return <E extends React.SyntheticEvent<any>>(e: E) => {
        e.preventDefault()
        fn(e)
    }
}

function stopPropagation<T extends (e: any) => void>(fn: T) {
    return <E extends React.SyntheticEvent<any>>(e: E) => {
        e.stopPropagation()
        fn(e)
    }
}

//? Example =================
interface InputProps {
    onChange: (value: string) => void
    value: string
}

function Input({ value, onChange }: InputProps) {
    return (
        <input
            value={value}
            onChange={preventDefault(stopPropagation(getValue(onChange)))}
        />
    )
}


//? Виклик функцій з права на ліво
function compose<U>(...fns: Function[]) {
    return <E>(initialValue: any): U =>
        fns.reduceRight((previousValue, fn) => fn(previousValue), initialValue)
}

//? Виклик функцій з ліва на право
function pipe<U>(...fns: Function[]) {
    return <E>(initialValue: any): U =>
        fns.reduce((previousValue, fn) => fn(previousValue), initialValue)
}

//? фнукція для отримання значень об'єкта за ключами
function pick<K extends string>(prop: K) {
    return <O extends Record<K, any>>(obj: O) => obj[prop]
}

//const some = pick('value')({value: 1}) // -> 1

//? Перевірка на рівність
function isEqual<T>(left: T) {
    return <E extends T>(right: E) => left === right
}

function cond(b: boolean) {
    return b!
}

//** Filter Comments Example*/
const comments = [
    { id: 22, text: "text One" },
    { id: 44, text: "text Two" },
]

const createFilterBy = (prop: string) => (id: number) =>
    pipe(pick(prop), isEqual(id), cond)
const filterWithId = createFilterBy("id")
const filterWithId22 = createFilterBy("id")(22)
const filterByValue = createFilterBy("value")

const filteredComments = comments.filter(pipe(pick("id"), isEqual(22), cond)) // { id: 44, text: "text Two" }
