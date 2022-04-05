// Classes
//! Модифікатори доступу public, private, protected
//? public доступний в класі, дочірніх класах і в ексземплярі (по замовчуванню)
//? protected доступний в класі, дочірніх класах
//? private доступний в класі
//! на можемо понижати рівень доступу, підвищити можемо

class Constructor {
    field: number = 123

    constructor(arg: number) {
        this.field = arg
    }

    public publicMethod() {
        return this.field
    }

    protected protectedMethod() {
        return this.field + 10
    }

    private privateMethod() {
        return this.field + 20
    }
}

class Child extends Constructor {
    public publicMethod() {
        return super.publicMethod()
    }

    protected protectedMethod(): number {
        return super.protectedMethod()
    }
}

//! Абстрактні класи - це класи від якого можна лише унаслідуватись і переопреділити методи
abstract class AbstractClass {
    public abstract abstractField: number

    public abstract abstractMethod(): number

    protected protectedMethod() {
        return this.abstractField
    }
}

class NewChild extends AbstractClass {
    public abstractField: number = 123

    public abstractMethod(): number {
        return this.protectedMethod()
    }
}

//! Класи і інтерфейси==============================================

interface MyInterface<T> {
    field: string
    method(): string
}

class NewClass<T> implements MyInterface<T> {
    public field: string = "123"
    public conf?: T

    public method(): string {
        return ""
    }
}

//! Клас комопонент ===========================================
// class MyComponent extends React.Component<
//     { prop1: number },
//     { state1: string }
// > {
//     constructor(props: { prop1: number }) {
//         super(props)
//         this.state = {
//             state1: "123",
//         }
//     }

//     public render() {
//         return <div>{this.props.prop1}</div>
//     }
// }
