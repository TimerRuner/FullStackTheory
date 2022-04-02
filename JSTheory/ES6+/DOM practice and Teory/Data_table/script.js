const users = [
  {
    "_id": "5d220b10e8265cc978e2586b",
    "isActive": true,
    "balance": 2853.33,
    "age": 20,
    "name": "Buckner Osborne",
    "gender": "male",
    "company": "EMPIRICA",
    "email": "bucknerosborne@empirica.com",
    "phone": "+1 (850) 411-2997",
    "registered": "2018-08-13T04:28:45 -03:00",
        "nestedField": { total: 300 }
  },
  {
    "_id": "5d220b10144ef972f6c2b332",
    "isActive": true,
    "balance": 1464.63,
    "age": 38,
    "name": "Rosalie Smith",
    "gender": "female",
    "company": "KATAKANA",
    "email": "rosaliesmith@katakana.com",
    "phone": "+1 (943) 463-2496",
    "registered": "2016-12-09T05:15:34 -02:00",
        "nestedField": { total: 400 }
  },
  {
    "_id": "5d220b1083a0494655cdecf6",
    "isActive": false,
    "balance": 2823.39,
    "age": 40,
    "name": "Estrada Davenport",
    "gender": "male",
    "company": "EBIDCO",
    "email": "estradadavenport@ebidco.com",
    "phone": "+1 (890) 461-2088",
    "registered": "2016-03-04T03:36:38 -02:00",
    "nestedField": { total: 200 }
  }
];

const tableSchema = {
  index: '#',
  name: 'Name',
  email: 'Email',
  balance: 'Balance',
}

//? Метод для генерації заголовочної секії таблиці
function generateThead(tableSchema) {
  const thead = document.createElement('thead');//? створили заголовок таблиці
  const tr = generateTr(tableSchema, 'th');//? створюємо строку для секції заголовку
  thead.appendChild(tr);
  return thead;
}

//? метод для генерації строк із стовбцями потрібного типу
function generateTr(tableSchema, tagName = 'td') {
  const tr = document.createElement('tr');//? створили строку
  Object.values(tableSchema).forEach(val => {
    const td = document.createElement(tagName); //? створюємо стовбець / заголовковий стовбець
    td.textContent = val;//! наповнюємо поточний стовбець контентом із об'єкта
    tr.appendChild(td);
  });

  return tr;
}


//? метод генерації тіла таблиці і заповнення даними із об'єкта данних
function generateTbody(tableSchema, items) {
  const tbody = document.createElement('tbody');
  items.forEach((item, index) => {
      item.index = index + 1;//! кожному об'єкту ми задаємо поле індекс із поточним значенням
      const itemSchema = generateItemsSchema(tableSchema, item);//? отримуємо об'єкт який містить необхідні для розмітки поля і під ними значення
      const tr = generateTr(itemSchema, 'td');//? створюємо строку із стовбцями і необхідними значеннями
      tbody.appendChild(tr);
  });

  return tbody;
}

//? Створюємо розмітку в середині таблиці
function generateItemsSchema(tableSchema, item) {
  //! створюємо новий об'єкт з полів спільних для обох об'єктів-параметрів і з передачею чначень із users під цими ключами в новий об'єкт
  const itemSchema = Object.keys(tableSchema).reduce((acc, key) => {
      if (key in item) {//! шукаємо співпадіння ключів структурного об'єкта tableSchema і users
          acc[key] = item[key];//! об'єкту під спільним ключем задаємо значення об'єкта users із цим ключем
      }

      return acc;
  }, {});

  return itemSchema;
}

//? сворення таблиці
function generateTableTemplate() {
  const table = document.createElement('table');
  table.classList.add('table');
  return table;
}


//? генеруємо баланс значенб таблиці
function generateTotalBalance(tableSchema, items) {
  const total = items.reduce((acc, item) => acc + parseFloat(item.balance), 0);
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  const columnCounts = Object.keys(tableSchema).length;//! підраховуємо к-сть стовбців в таблиці

  td.insertAdjacentHTML('beforeend', `Total balance: <b>${total}</b>`);
  td.setAttribute('colspan', columnCounts);//! для створеня окремого і єдиного крайнього стовбця в таблиці для балансу
  td.setAttribute('align', 'right');

  tr.appendChild(td);

  return tr;
}


//? метод компіляції таблиці
function initTable(tableSchema, items) {
  const container = document.querySelector('.table-container');
  const table = generateTableTemplate();
  const header = generateThead(tableSchema);
  const body = generateTbody(tableSchema, items);
  const total = generateTotalBalance(tableSchema, items)

  table.appendChild(header);
  table.appendChild(body);
  table.appendChild(total);

  container.appendChild(table);
}

initTable(tableSchema, users);