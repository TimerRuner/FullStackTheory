// //***новий стандарт для ajax запитів з використанням промісів, по замаовчуванню це get запити */
// fetch(`https://jsonplaceholder.typicode.com/posts/1`)
//     .then(response => {
//         console.log(response);
//         return response.json();//** повертає проміс і тіло відповіді із сервера */
//     })
//     .then(posts => console.log(posts))//*** працюємо із даними взятими із попереднього then */
//     .catch(err=> console.log(err));


//! складніший варіант
function getPost(id){
    return new Promise((resolve, reject)=>{
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())//**повертає дані із сервера в залежності від формату викликаємо необхідний response метод */
            .then(posts => resolve(posts))//**опрацьовує дані отримані зі сервера */
            .catch(err => reject(err));//**опрацбовує помилки, з якими ми можемо працювати пізніше */
    });
}
getPost(1).then(post=> console.log(post));


//! спрощений спосіб, ми зможемо обробити помилку в відповіді із сервера, але не зможемо обробити помилку в методі
function getPost2(id){
    const [userType, userId] = id.split('-')
    return  fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
    .then(response => response.json());
}

getPost2('user-1')
    .then(post => console.log(post))
    .catch(err => console.log(err));//! отримаємо помилку із сервера, але не помилку в методі


//! приклад з обгорткою завдяки якій ми зможемо орпацьовувати і помилки на сервері і в методі завдяки обготці пустишці

function getPost3(id){
  return Promise.resolve().then(() => {
    const [userType, userId] = id.split('-')
    return  fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
    .then(response => response.json());
  });
}

getPost2(3)
    .then(post => console.log(post))
    .catch(err => console.log(err));//! тепер catch оброблятиме усі помилки і відповіді від сервера, і помилки в методі
