## arr-obj
Like array, but object with same methods

**filter, map, forEach, find, concat, some, every**

### Examples
```ts
const  EXAMPLE_OBJECT = {
	name:  'John',
	surname:  'Bayer',
	age:  30,
	birth:  'Tue Feb 02 1993',
	children: [{ name:  'Bob', age:  1 }]
}
```

```ts
const  obj = new ArrObject(EXAMPLE_OBJECT)
	.filter((_key, value) =>  Number.isInteger(value))
	.map((_key, value) =>  value * 2)
	.concat({nickname:  'Eddy'})

assert.deepEqual(obj, {age:  60, nickname:  'Eddy'})
```
