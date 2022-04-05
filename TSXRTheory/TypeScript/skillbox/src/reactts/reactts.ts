//! React Component
export const Component: React.FC = () => {}

//! React Component porps
export const Component: React.FC<propsinterface> = () => {}

//? children at props
interface CardProps {
    children?: React.ReactChild | React.ReactNode
}

//! React Events (в дженеріках вказувати тип елемента до якого застосовано подію)
//? тепер в e - знаходяться властивості що відносяться до роботи із полями і в часності інпутами
const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    // setValue(e.target.value)
}

//? отримаємо всі доступні для мишки властивості
const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(inputRef.current?.value)
}

//? React drag and drop
const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("Drag")
}

const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
        //? Точно вказуємо, що ref.current.value !== null
        // props.onAdd(ref.current.value)
        props.onAdd(title)
        setTitle("")
    }
}
