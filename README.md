# this is a promise package promise-test-luvsam

code for testing

const promiseTest = require('promise-test-luvsam')

const test = new promiseTest((resolve, reject) => {setTimeout(() => {
    reject(499999)
}, 3000);})
test.then(value => console.log(value))
console.log("0321938492038402")
test.catch(value => console.log("rejected", value))
