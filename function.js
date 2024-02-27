/**
 * Like .filter(), but instead of copying the original array, this is the modifying one.
 *
 * Use example:
 * const numbers = Array.from(Array(10), (_, index) => index + 1); // create elements array-of-integer 1-10

 * const even = numbers.separate((num) => num % 2 === 0)
 * const odd = numbers
 *
 * console.log('original', numbers)
 * console.log('even numbers', even)
 * console.log('odd numbers', odd)
 *
 * 'original' console value will the same as 'odd numbers' console value

 * @param {function} callback Pass a callback. e.g, (num) => num % 2 === 0
 * @returns The elements that fulfill the callback condition
 */
Array.prototype.separate = function(callback) {
    const arr = []

    if (typeof callback !== 'function') throw new Error('.separate() needs a callback!')

    for (let i = 0; i < this.length; i++) {
      if (callback(this[i])) {
        arr.push(this.splice(i, 1)[0])
        i -= 1
      }
    }

    return arr
}

const numbers = Array.from(Array(10), (_, index) => index + 1);

const even = numbers.separate((num) => num % 2 === 0)
const odd = numbers

console.log('original', numbers)
console.log('even numbers', even)
console.log('odd numbers', odd)
