// const _ = require('mori')

// const log = (...args) => console.log(...args.map(_.toJs))

// const x = _.vector(1, 2, 3, 4, 5, 6)
// const extractEvenNumbers = list => _.filter(_.isEven, list)
// const doubleAllNumbers = list => _.map(num => num * 2, list)
// const sumAllNumbers = list => _.reduce(_.sum, 0, list)

// const z = _.pipeline(x, extractEvenNumbers, doubleAllNumbers, sumAllNumbers)

// log(z)

// let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const evenNumbers = extractEvenNumbers(x)
// const newNumbers = doubleAllNumbers(evenNumbers)
// console.log(newNumbers)

// let x = [1, 2, 3, 4, 5]

// function extractEvenNumbers () {
//   return x.filter(num => num % 2)
// }

// let x = [1, 2, 3, 4, 5]

// for (let num of x) {
//   num * 2
// }

// console.log(x)

// const doubleAllNumbers = list => list.map(num => num * 2)
// let x = [1, 2, 3, 4, 5]
// console.log((doubleAllNumbers(x)))

// const x = [1, 2, 3, 4, 5]

// const doubleAllNumbers = list => list.map(num => num * 2)
// const extractEvenNumbers = list => list.filter(num => num % 2)
// const sumAllNumbers = list => list.reduce((acc, num) => acc += num, 0)

// const y = doubleAllNumbers(x)
// const z = extractEvenNumbers(x)
// const a = sumAllNumbers(x)

// iterative value change
// let x = [1, 2, 3, 4, 5]
// console.log(x) // --> [1, 2, 3, 4, 5]
// x.push(6)
// console.log(x) // --> [1, 2, 3, 4, 5, 6]

// // functional value change
// let y = [1, 2, 3, 4, 5]
// console.log(y) // [1, 2, 3, 4, 5]
// let z = y.push(6) 
// console.log(z) // [1, 2, 3, 4, 5, 6]

// immutable value change using Mori
// const _ = require('mori')
// const log = (...args) => console.log(...args.map(_.toJs))

// const double = n => n * 2
// const inc = n => n += 1

// let a = _.vector(1, 2, 3, 4, 5)
// let b = _.map(double, a)
// let c = _.map(inc, b)
// let d = _.filter(_.isOdd, c)

// log(d)

// const _ = require('mori')
// const log = (...args) => console.log(...args.map(_.toJs))

// const a = _.range()
// const b = _.take(10, a)
// const c = _.take(3, a)
// const d = _.take(20, a)
// log(b)
// log(c)
// log(d)


const _ = require('mori')
const log = (...args) => console.log(...args.map(_.toJs))

const list = _.list(1, 2, 3, 4)
const vector = _.vector(1, 2, 3, 4)
const hashMap = _.hashMap('name', 'jon', 'age', 29, 'favorite numbers', vector)
const sortedMap = _.sorted_map(1, 'a value', 2, 'another value', 3, 'one more value')
const set = _.set(['dog', 'cat', 'micro pig', 'parrot'])
const sortedSet = _.sortedSet(['lion', 'tiger', 'bobcat'])
const range = _.range(10)
const queue = _.queue(1, 2, 3)

log(list) // --> (1 2 3 4)
log(vector) // --> [1, 2, 3, 4]
log(hashMap) // --> {"name" "jon", "age" 29, "numbers", [1, 2, 3, 4]}
log(sortedMap) // --> {1 'a value', 2 'another value', 3 'one more value'}
log(set) // --> #{"dog" "cat" "micro pig" "parrog"}
log(sortedSet) // --> #{"lion" "tiger" "bobcat"}
log(range) // --> (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
log(queue) // --> #queue [1 2 3]

const conj = _.conj(vector, 5, 6) // --> [1, 2, 3, 4, 5, 6]
const nth = _.nth(vector, 3) // --> 4
const popVector = _.pop(vector) // --> [1, 2, 3]
const popList = _.pop(list) // --> (2 3 4)
const empty = _.empty(vector) // --> []
const each = _.each(vector, i => log(i))
const map = _.map(i => i * 2, list)
const filter = _.filter(i => i % 2, list) // --> returns even numbers only
const remove = _.remove(i => i % 2, list) // --> removes all even numbers
const reduce = _.reduce(_.sum, list)

const f = (acc, key, val) => acc + "(" + key + ":" + val + ")"
const reduceKV = _.reduceKV(f, "", hashMap)
const take = _.take(5, range) // --> (0 1 2 3 4)
const drop = _.drop(2, list) // (3 4)

const identity = _.identity(3) // --> 3
const isEven = _.isEven(2) // --> true
const isOdd = _.isOdd(2)// --> false

const juxt = _.juxt(_.first, _.last)
juxt(vector) // --> [1, 4]

const pipeline = _.pipeline(vector, filter, i => i * 2) // --> [4, 8] 

const curry = _.curry(_.conj, 5)
curry(vector)

const toClj = _.toClj([1, 2, 3, 4]) // --> converts JS array to _.vector
const toJsVector = _.toJs(vector) // --> [1, 2, 3, 4]
const toJsHashMap = _.toJs(hashMap) // --> {name: 'jon', age: 29, numbers: [1, 2, 3, 4]}






























