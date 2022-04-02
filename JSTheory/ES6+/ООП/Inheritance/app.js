function Product(brand, price, discount){
    this.brand = brand;
    this.price = price;
    this.discount = discount;
}
//! прототип методу, щоб не зберігати мтеод в кожному об'єкті, але давати їм доступ до нього через прототип
Product.prototype.getPriceWithDiscount = function (){
    return (this.price * (100 - this.discount)) / 100;
};

Product.prototype.setPrice = function (newPrice){
    return this.price = newPrice;
};

const apple = new Product('apple', 100, 10);
const sumsung = new Product('samsung', 200, 25);






    //! ПАРАДИГМИ ООП---------------------------------------------------------------------------
//! створення прототипу об'єкту (НАСЛІДУВАННЯ)--------------------------------------------------

const protoForObj = {
    sayHello(){
        return 'Hello World';
    },
};


//!Створюємо об'єкт, який наслідуватиметься, матиме методи і поля об'єкт який ми передамо в Object.create(...)
//? передаємо об'єкт-дискріптор для задачі поточному об'єкту настройки
const obj = Object.create(protoForObj, {
    firstName: {
        value: 'Denis'
    },
});



//!-------------------------------------Функціональне наслідування ----------------------------------------------------------------------------------------------------

function User(firstName, lastName){
    this.firstName = firstName;
    this.LastName = lastName;
}

User.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
};

User.prototype.sayHello = function(){
    return `Hello ${this.firstName} ${this.lastName}`;
};

const user = new User('Vadym', 'Maslovskyi');

function Customer(firstName, lastName, memberShip){
    //**this - вказує на контекст даного конструктора */
    User.apply(this, arguments);//! функціональне наслідування, викликаємо User в контексті даного конструктора
    this.memberShip = memberShip;
}

//! -------------------------------------Прототипне наслідування-----------------------------------------------
//! aplly наслуування вимагає переливання протитипних методів з батькового прототипа до дочірнього
Customer.prototype = Object.create(User.prototype);
Customer.prototype.constructor = Customer;

//! лише після двох вищих методів ми вказуємо власні прототипи для Customer
Customer.prototype.getMemberShip = function(){
    return this.memberShip.toUpperCase();
}

const customer = new Customer('Ivan', 'Ivanov', 'basic');



//! -----------------------------------------CLASS-------------------------------------------------
const newBrand = 'setBrand';//! задаємо назву методу в класі
class ES6 {
    constructor(brand, price, discount){
        //**викликається лише при необхідності передачі в клас змінних */
        this._brand = brand;
        this.price = price;
        this.discount = discount;
    }

    get brand(){
       return this._brand;
    }
    set brand(brand){
        this._brand = brand;
    }

    //! дані методи на автоматі потрапляють в prototipe
    getPriceWithDiscount(){
        return (this.price * (100 - this.discount)) / 100;
    }
    setPrice(newPrice){
        this.price = newPrice;
    }
    //!  об'євлення методу, завдяки якому ми можемо міняти його назву
    [newBrand](newBrand){
        this.brand = newBrand;
    }

    //! створення статичних методів - методи, які не викликаються з об'єкта класу, а викликаються із конструктора
    static plus(x, y){
        return x + y;
    }
}

const newProduct = new ES6('samsung', 100, 25);

ES6.plus(1,2);


//!--------------------------------НАСЛІДУВАННЯ КЛАСІВ В ES6------------------------------------------------
class UserES{
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getFullName(){
        return `${firstName} ${lastName}`;
    }
}

class CustomerES extends UserES{
     //**конструктор, в який ми передаємо усі наші змінні для цього класу */
    constructor(firstName, lastName, memberShip){
        //** передаємо параметри, які є лише в унаслідуваного класу*/
        super(firstName, lastName);//! заміна User.call(this, firstName, lastName)
        this.memberShip = memberShip;
    }
    //**Якщо ми маємо такий же за назвою метод, як і в батька, то для об'єктів цього класу спрацює і метод цього класу */
    //**для виклику переопреділеноо батьківського методу можна зробити так: */
    getFullName(){
        const parentRes = super.getFullName(); //**передали результат батьківського методу, приклад поліморфізму */
        return `${parentRes} memberShip: ${this.memberShip}`;
    }

}

const customerEs = CustomerES('Maslovskyi', 'Vadym', 'basic')