# Functional Programming

Paradigm that focuses on the use of functions and immutability to write clean and predictable code.

## Impure Function

Function that can produce different results for the same input and/or cause side effects outside the function.

**Impure functions should be avoided as much as possible!**

```javascript
let total = 0;

const sum = (a, b) => (total += a + b, total);

console.log(sum(10, 5)); // Output: 15

console.log(sum(10, 5)); // Output: 30
```

## Pure Function

Function that always produces the same result for the same input and does not cause side effects.

```javascript
const sum = (a, b) => a + b;

console.log(sum(10, 5)); // Output: 15

console.log(sum(10, 5)); // Output: 15
```

## Immutability

Data that cannot be changed once created, promoting predictability and safety.

**Mutability should be avoided as much as possible!**

```javascript
const array = [1, 2, 3];

const newArray = array.concat(4, 5, 6);

array = newArray; // Error: Assignment to constant variable.

console.log(array); // Output: [1, 2, 3]

console.log(newArray); // Output: [1, 2, 3, 4, 5, 6]
```

## First-Class Function

Function can be assigned to a variable, passed as an argument, or returned by another function.

#### Variable

```javascript
const greet = (name) => `Hello, ${name}!`;

console.log(greet("Batman")); // Output: Hello, Batman!
```

#### Argument

```javascript
const batman = () => "Batman";

const greet = (hero) => `Hello, ${hero()}!`;

console.log(greet(batman)); // Output: Hello, Batman!
```

#### Return

```javascript
const greetBatman = () => "Hello, Batman!";

const greet = () => greetBatman;

console.log(greet()); // Output: Hello, Batman!
```

## Higher-Order Function

Function that can take other functions as arguments or return them as results.

```javascript
const calculate = (number, operation) => operation(number);

const double = (number) => number * 2;

const triple = (number) => number * 3;

console.log(calculate(5, double)); // Output: 10

console.log(calculate(5, triple)); // Output: 15
```

## Currying

 Technique that transforms a function with multiple arguments into a series of functions, each with single argument.

#### Without

```javascript
const calculateTotal = (price, discount, shipping) => price * (1 - discount / 100) + shipping;

console.log(calculateTotal(100, 60, 10)); // Output: 50

console.log(calculateTotal(500, 60, 10)); // Output: 210
```

#### With

```javascript
const calculateTotal = (shipping) => (discount) => (price) => price * (1 - discount / 100) + shipping;

const calculateTotalWithShippingAndDiscount = calculateTotal(10)(60);

console.log(calculateTotalWithShippingAndDiscount(100)); // Output: 50

console.log(calculateTotalWithShippingAndDiscount(500)); // Output: 210
```

## Recursion

Technique where a function calls itself to solve a problem, often used for repetitive tasks.

#### Without

```javascript
const factorial = (number) => {
    let result = 1;

    for (let i = 1; i <= number; i++) {
        result *= i;
    }

    return result;
};

console.log(factorial(5)); // Output: 120
```

#### With

```javascript
const factorial = (number) => number ? number * factorial(number - 1) : 1;

console.log(factorial(5)); // Output: 120
```

## Mapping

Applies a function to each element of an array and creates a new array with the transformed values.

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((number) => number * 2);

console.log(doubled); // Output: [2, 4, 6, 8, 10]
```

## Filtering

Filters elements from an array that meet a specific condition and creates a new array with those elements.

```javascript
const numbers = [1, 2, 3, 4, 5];

const evens = numbers.filter((number) => number % 2 === 0);

console.log(evens); // Output: [2, 4]
```

## Reduce

Combines all elements of an array into a single element using an aggregation logic.

```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, number) => accumulator + number);

console.log(sum); // Output: 15
```

## Lazy Evaluation

Technique where expressions are only computed when their results are actually needed.

```javascript
const triple = (number) => number * 3;

const isEven = (number) => number % 2 === 0;

const numbers = [1, 2, 3, 4, 5];

const result = numbers.map(triple).filter(isEven);

console.log(result); // Output: [6, 12]
```