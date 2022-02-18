const fsp = require('fs').promises;
const fs = require('fs');

const ruta = 'log_inicios.json';

const doSomethingAsync = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve('I did something'), 3000)
    })
}

const doSomething = async () => {
    console.log(await doSomethingAsync())
}

console.log('Before')
doSomething()
console.log('After')

/*
const myPromise = fsp.readFile(ruta, 'utf8');

myPromise.then(data => console.log("promise version: " + data))
    .catch(err => console.log("promise error: " + err));


fs.readFile(ruta, 'utf8', (err, data) => {
    if (err) throw err;
    console.log("callback version " + data);
})


const getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err)  // calling `reject` will cause the promise to fail with or without the error passed as an argument
        return        // and we don't want to go any further
      }
      resolve(data)
    })
  })
}

getFile(ruta)
.then(data => console.log(JSON.parse(data)))
.catch(err => console.error(err))
*/
//-------------------------------------------------

let done = true

const isItDoneYet = new Promise((resolve, reject) => {
    if (done) {
        const workDone = 'Here is the thing I built'
        resolve(workDone)
    } else {
        const why = 'Still working on something else'
        reject(why)
    }
})

const checkIfItsDone = () => {
    isItDoneYet
        .then(ok => {
            console.log(ok)
        })
        .catch(err => {
            console.error(err)
        })
}
