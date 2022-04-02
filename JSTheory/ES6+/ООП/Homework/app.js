//! Завдання 1 - реалізація через клас і функції-конструктори----------------------------------------------------
//! Використання наслідування \ поліморфізму в класах
class Planet{
    constructor(name){
        this.name = name;
    }
    getName(){
        return `Planet name is ${this.name}`;
    }
}

class PlanetWithSatellite extends Planet {
    constructor(name, satelitName){
        super(name);
        this.satelitName = satelitName;
    }
    getName(){
        const planet = super.getName();
        return `${planet}. The satellite is ${this.satelitName}`;
    }
}

const earth = new PlanetWithSatellite('Earth', 'Moon');

//! варіант конструктора------------------------------------
    function Planet1(name){
        this.name = name;
        this.getName = function() {
            return `Planet name is ${this.name}`;
        }
    }

    function PlanetWithSatellite1(name, nameSatellite){
        Planet1.call(this, name);
        this.nameSatellite = nameSatellite;
        //? переопреділення методу в дочірньому елементі(поліморфізм в конструкторах)------------------------------
        let lastFunc = this.getName; //! Завдяки наявності тут конструктора Planet1 в змінну потрапить його метод, а не метод даного об'єкта, так як він викликаний вище за об'явлення методу поточного об'єкта
        this.getName = function(){
            const firstStr = lastFunc.call(this);
            return `${firstStr}. The satellite is ${this.nameSatellite}`;
        }
    }

    const earth1 = new PlanetWithSatellite1('Earth', 'Moon');

console.log(earth1.getName());

//!Завдання 2--------------------------------------------------------------------------------------------------------------

class Build{
    constructor(name, stage){
        this.name = name;
        this.stage = stage;
    }
    getName(){
        return this.name;
    }
    setName(newName){
        this.name = newName;
    }
}

class House extends Build{
    constructor(name, stage){
        super(name, stage);
    }
    apartmentInStage(appartmentSum){
        return {
            stage: this.stage,
            appAppartment: appartmentSum * this.stage,
        }
    }
}
class Trading_center extends Build{
    constructor(name, stage){
        super(name, stage);
    }
    shoppingSum(shopCount){
        return{
            stage: this.stage,
            sumShop: shopCount * this.stage,
        }
    }
}
const house = new House('First', 10);
const sum = house.apartmentInStage(5);
const center = new Trading_center('Second', 15);
const sum1 = center.shoppingSum(3);
console.log(sum, sum1);


//! Завдянна 3 ----------------Метод должен быть объявлен с помощью прототипов (Func.prototype...).--------------
//!--------------------------------------------------------------

function Funiture(name, price){
    this.name = name;
    this.price = price;
}

Funiture.prototype = {
    __class_name: "Funiture",
    constructor: Funiture,
    getInfo: function ()
        {
            return `Name: ${this.name} Price: ${this.price}`;
        }
}


function OfficeFuniture(name, price, haveComputer){
    Funiture.call(this, name, price);
    this.haveComputer = haveComputer;
}

OfficeFuniture.prototype = {
    __class_name: "OfficeFuniture",
    constructor: OfficeFuniture,
    getInfo: function ()//! приклад поліморфізму
        {
            return `${this.Funiture.getInfo.apply(this)} Have electronic: ${this.haveComputer}`;//! беремо метод з батьківського класу і викликаємо в дочірньому
        }
}

inherit_C(OfficeFuniture, Funiture);




function HomeFuniture(name, price, rooms){
    Funiture.call(this, name, price);
    this.rooms = rooms;
}

HomeFuniture.prototype = {
    __class_name: "HomeFuniture",
    constructor: HomeFuniture,
    getInfo: function ()
        {
            return `${this.Funiture.getInfo.apply(this)} Room count: ${this.rooms}`;
        }
}

inherit_C(HomeFuniture, Funiture);

const home = new HomeFuniture('Bag', 2222, 2);

function inherit_C(Child, Parent){//! метод для прототипного наслідування
    var F = function () { };
    F.prototype = Parent.prototype;
    var f = new F();

    for (var prop in Child.prototype) f[prop] = Child.prototype[prop];
    Child.prototype = f;
    Child.prototype[Parent.prototype.__class_name] = Parent.prototype;
}


//! Завдання 4 ----------------------------------------------------Завдання 4-----------------------------------
//! Метод должен быть объявлен с помощью прототипов (Func.prototype...)-----------------------------------------

function User(name, data){
    this.name = name;
    this.data = data;
}

User.prototype = {
    __class_name: "User",
    constructor: User,
    getInfo: function ()
        {
            return `Name: ${this.name} Data: ${this.data}`;
        }
}

function Admin(name, data, admin){
    User.call(this, name, data);
    superAdmin = admin;

}

Admin.prototype = {
    __class_name: "Admin",
    constructor: Admin,
    getInfo: function ()
        {
            return `${this.User.getInfo.apply(this)} Super Admin status: ${superAdmin}`;
        }
}

inherit_C(Admin, User);

const admin = new Admin('Vadym', '10/09/1999', true);


function Guest(name, data, valid){
    User.call(this, name, data);
    validDate = valid;

}

Guest.prototype = {
    __class_name: "Guest",
    constructor: Guest,
    getInfo: function ()
        {
            return `${this.User.getInfo.apply(this)} Vadlid Date: ${validDate}`;
        }
}

inherit_C(Guest, User);

const guest = new Guest('Vadym', '10/09/1999', '2');


function inherit_C(Child, Parent)
{
    var F = function () { };
    F.prototype = Parent.prototype;
    var f = new F();

    for (var prop in Child.prototype) f[prop] = Child.prototype[prop];
    Child.prototype = f;
    Child.prototype[Parent.prototype.__class_name] = Parent.prototype;
}



//***----------------------------------------------CLASS TASKS-------------------------------------- */
//***---------1--------------1--------------1------------1 */
function Component1(tagName) {
    this.tagName = tagName || 'div';
    this.node = document.createElement(tagName);
}


class Component1_2{
    constructor(tagName){
        this.tagName = tagName || 'div';
        this.node = document.createElement(tagName);
    }
}
    const comp = new Component1('span');

//***---------2--------------2--------------2------------2 */
function Component2(tagName) {
    this.tagName = tagName || 'div';
    this.node = document.createElement(tagName);
  }

  Component1_2.prototype.setText = function (text) {
    this.node.textContent = text;
  };


class Component2_2{
    constructor(tagName){
        this.tagName = tagName || 'div';
        this.node = document.createElement(tagName);
    }
    set setText(text){
        this.node.textContent = text;
    }
}