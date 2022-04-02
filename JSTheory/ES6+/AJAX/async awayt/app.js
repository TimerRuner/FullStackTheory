// function getPost(id){
//     return Promise.resolve().then(() => {
//         const [userType, userId] = id.split('-');
//         return fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
//             .then(response => response.json(),
//             );
//     });
// }
//! метод з async - завжди повертатиме проміс, тобто попередній метод можна записати без промісової обгортки-----------
async function getPost(id){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);//! записуємо рзультат без then
    const data = await response.json();
    return data;
}

getPost(1)
    .then(data=>console.log(data))
    .catch(err=> console.log(err));//! опрацює помилки при відповіді сервера і помилки в самому методі




//** коротший варіант  */

async function getPost2(id){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,)
        .then(res => res.json());
    return response;
}

getPost2(1)
    .then(data=>console.log(data))
    .catch(err=> console.log(err));

//!-------------------------------------------------------------------------------------------------------
//**з використанням try catch ----------------------------------------------------------------------------*/

async function getPost3(id){
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,)
            .then(res => res.json());
        return response;

    } catch (err) {
        //**конструкція для створення логіки опрацювання додаткових помилок*/
        console.log(err);
        return Promise.reject(err); //! без Promise - ми не зловимо помилки catch ззовні в .catch()
    }
}

getPost3(1)
    .then(data=>console.log(data))
    .catch(err=> console.log(err));

//** для отримання декількох різних резкльтатів від запитів на сервер ---------------------------------------------*/
async function getPost3(id){
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,)
            .then(res => res.json());
        return response;
    } catch (err) {
        console.log(err);
        return Promise.reject(err); //! якщо тут не вкажу проміс, то ззовні не спіймаю його
    }
}

async function getAll(){
    const [res1, res2] = await Promise.all([getPost(1), getPost(2)]);
    console.log(res1, res2);
}
getAll();