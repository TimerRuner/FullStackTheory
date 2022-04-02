
function map(array, callback){
  for(let i = 0; i < array.length; i++){
    callback(i, array[i], array);
  }
}
function getInfo(i, item, arr){
  console.log(i, item, arr);
}
const array = ['ru', 'ua', 'uk', 'ge'];

// map(array, getInfo);


// Binding

const sum = (a, b) => a * b

const add = sum.bind(null, 2);
console.log(add(3));
console.log(add(5));