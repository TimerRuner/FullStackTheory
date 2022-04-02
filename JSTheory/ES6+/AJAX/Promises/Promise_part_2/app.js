function customHttp() {
    return {
      get(url, cb) {
        try {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.addEventListener('load', () => {
            if (Math.floor(xhr.status / 100) !== 2) {
              cb(`Error. Status code: ${xhr.status}`, xhr);
              return;
            }
            const response = JSON.parse(xhr.responseText);
            cb(null, response);
          });

          xhr.addEventListener('error', () => {
            cb(`Error. Status code: ${xhr.status}`, xhr);
          });

          xhr.send();
        } catch (error) {
          cb(error);
        }
      },
      post(url, body, headers, cb) {
        try {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', url);
          xhr.addEventListener('load', () => {
            if (Math.floor(xhr.status / 100) !== 2) {
              cb(`Error. Status code: ${xhr.status}`, xhr);
              return;
            }
            const response = JSON.parse(xhr.responseText);
            cb(null, response);
          });

          xhr.addEventListener('error', () => {
            cb(`Error. Status code: ${xhr.status}`, xhr);
          });

          if (headers) {
            Object.entries(headers).forEach(([key, value]) => {
              xhr.setRequestHeader(key, value);
            });
          }

          xhr.send(JSON.stringify(body));
        } catch (error) {
          cb(error);
        }
      },
    };
  }
  // Init http module
  const myHttp = customHttp();


  //! callback hall - ланцюг кол бек викликів з метою опрацювати різні дані
  myHttp.get(
    'https://jsonplaceholder.typicode.com/posts/1',
    (err, res) => {
      if(err) {
        console.log('error', err);
        return;
      }
      myHttp.get(
        'https://jsonplaceholder.typicode.com/comments?postId=1',
        (err, res) => {
          if(err){
            console.log('error', err);
            return;
          }
          myHttp.get(
            'https://jsonplaceholder.typicode.com/users/1',
            (err, res) => {
              if(err){
                console.log('error', err);
                return;
              }
              console.log('Yee boi!!');
            },
          );
        },
      );
    },
  );

//! просунутіший і стабільніший приклад попереднього варіанту------------------------------------------
  //! метод для отримування конкретного поста
  function getPost(id){
    return new Promise((resolve, reject)=>{
      myHttp.get(`https://jsonplaceholder.typicode.com/posts/${id}`, (err, res)=>{
        if(err){
          reject(err);//! якщо є помилка, то promise зупинить лінцюг колбеків
        }
        resolve(res);
      })
    });
  }
//! метод отримання комента даного поста
  function getPostComments(post){
    const { id } = post;//***отримуємо діні попереднього промісу */

    return new Promise((resolve, reject)=>{
      //***отримуємо доступ до коментарів посту по ід*/
      myHttp.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`, (err, res)=>{
        if(err){
          reject(err);//! якщо є помилка, то promise зупинить лінцюг колбеків
        }
        //** так як в даний метод можна передавати 1 аргумент, то ми передаємо об'єкт із даними попереднього і цього методу */
        resolve({post, comments: res});
      })
    });
  }
//! метод отримання автора даного поста
  function getUserCreatPost(data){
    //**витягнули id автора, по якоми ми його знайдемо */
    const {
      post: { userId },
     } = data;

    return new Promise((resolve, reject)=>{
      //*** доступ до користувачів */
      myHttp.get(`https://jsonplaceholder.typicode.com/users/${userId}`, (err, res)=>{
        if(err){
          reject(err);//! якщо є помилка, то promise зупинить лінцюг колбеків
        }
        //***передаємо в data деструкторизовані дані з перших двох методів і результат даного методу */
        resolve({ ...data, user: res });
      })
    });
  }

  //*** так як в кожному методі є проміс, то  ми можемо вистроїти ланцюг методів*/
getPost(3)
  .then(post=>getPostComments(post))//! в post зберігається відповідь від першого resolve і передаємо пост в наступний метод
  .then(data=>getUserCreatPost(data))//! передається далі пост із першого виклику і коментарі із другого виклику в вигляді об'єкта, так як resolve отримує 1 параметр в даний метод
  .then(fullData=> console.log(fullData))
  .catch(err=>console.log(err))//! якщо випаде помилка в одному із then, ми потрапимо сюди
  .finally(()=> console.log('finally'));//! метод який вконуватиметься в будь-якому випадку

  //! створення стеку результатів промісів в кожному методі - на виході масив результатів виконання промісів в усіх методах
  function getPost2(id){
    return new Promise((resolve, reject)=>{
      myHttp.get(`https://jsonplaceholder.typicode.com/posts/${id}`, (err, res)=>{
        if(err){
          reject(err);
        }
        resolve(res);
      })
    });
  }

  function getPostComments2(id){
    return new Promise((resolve, reject)=>{
      myHttp.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`, (err, res)=>{
        if(err){
          reject(err);
        }

        resolve(res);
      })
    });
  }

  function getUserCreatPost2(userId){
    return new Promise((resolve, reject)=>{
      //*** доступ до користувачів */
      myHttp.get(`https://jsonplaceholder.typicode.com/users/${userId}`, (err, res)=>{
        if(err){
          reject(err);
        }

        resolve(res);
      })
    });
  }

//! результати кожного окремого виклику ми опрацьовуємо в одному методі і в then отримуємо масив результатів даних запитів
  Promise.all([getPost2(1), getPostComments2(1), getUserCreatPost2(1)])
  .then(([post, comments, user]) => console.log(post, comments, user))//! деструктуризували масив результатів promise.all()
  .catch(err => console.log(err));