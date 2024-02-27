# .separate-js
Like .filter(), but instead of copying the original array, this is the modifying one.

I just wonder why Javascript does not have a prototype function for modifying the original array. So, I made it myself.
See ```function.js```

## My motivation for made this prototype function
```.filter()``` is copying the original array. So, my concern is that if the array has 100k elements, ```.filter()``` will increase memory usage for elements that fulfill the condition.

Example:
Let's imagine that we want to filter users by age. And we have 100k users.
```
// functions for show memory usage
function measureMemoryUsage() {
  const memoryUsage = process.memoryUsage();
  console.log('Memory usage:');
  console.log(`  - RSS: ${formatBytes(memoryUsage.rss)}`);
  console.log(`  - Heap Total: ${formatBytes(memoryUsage.heapTotal)}`);
  console.log(`  - Heap Used: ${formatBytes(memoryUsage.heapUsed)}`);
  console.log(`  - External: ${formatBytes(memoryUsage.external)}`);
}

function formatBytes(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

// functions for simulation
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// the prototype function
Array.prototype.separate = function (callback) {
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


const users = Array.from(Array(100_000), () => {
  return {
    name: generateRandomString(10), // simulate name
    age: generateRandomNumber(1, 100) // simulate age
  }
});

// const adultUsers = users.filter(user => user.age >= 21)
// const adultUsers = users.separate(user => user.age >= 21)

measureMemoryUsage();
```
On my OS, ```users.filter``` used a total memory of 52 MB, while ```users.separate``` used a total memory of 35 MB.

But yeah, this prototype function is slower than ```.filter()```. I need to change the algorithm, or something as simple as using worker maybe(?).
