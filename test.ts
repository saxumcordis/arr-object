import assert from 'node:assert';
import { test } from 'node:test';
import { ArrObject } from '.';

const EXAMPLE_OBJECT = {
        name: 'John',
        surname: 'Bayer',
        age: 30,
        birth: 'Tue Feb 02 1993',
        children: [{ name: 'Bob', age: 1 }]
}

test('filter', () => {
        const arrObj = new ArrObject(EXAMPLE_OBJECT);

        assert.deepEqual(arrObj.filter((_key, value) => Number.isInteger(value)), { age: 30 });
        assert.deepEqual(arrObj.filter((_key, value) => Number.isNaN(value)), {});
});

test('map', () => {
        const arrObj = new ArrObject(EXAMPLE_OBJECT);
        const currentDate = new Date().toDateString();

        assert.deepEqual(arrObj.map((key, value) => key === 'birth' ? currentDate : value),
                { ...EXAMPLE_OBJECT, birth: currentDate });
});

test('forEach', () => {
        let stringCount = 0;
        new ArrObject(EXAMPLE_OBJECT)
                .forEach((_key, value) => typeof value === 'string' && stringCount++);
        assert.equal(stringCount, 3);
});

test('find', () => {
        assert.deepEqual(new ArrObject(EXAMPLE_OBJECT)
                .find((_key, value) => Number.isInteger(value)), { age: 30 });
        assert.equal(new ArrObject(EXAMPLE_OBJECT)
                .find((_key, value) => Number.isNaN(value)), undefined);
});

test('concat', () => {
        /** do not modify if param is not object */
        assert.deepEqual(new ArrObject(EXAMPLE_OBJECT).concat(1), EXAMPLE_OBJECT);

        assert.deepEqual(new ArrObject(EXAMPLE_OBJECT)
                .concat({ spouse: { name: 'Mary', surname: 'Watson' } }),
                {
                        ...EXAMPLE_OBJECT, spouse: { name: 'Mary', surname: 'Watson' }
                });
});

test('some', () => {
        assert.equal(new ArrObject(EXAMPLE_OBJECT)
                .some((_key, value) => Number.isInteger(value)), true);
        assert.equal(new ArrObject(EXAMPLE_OBJECT)
                .some((_key, value) => Number.isNaN(value)), false);
});

test('every', () => {
        assert.equal(new ArrObject(EXAMPLE_OBJECT)
                .every((_key, value) => Number.isInteger(value)), false);
        assert.equal(new ArrObject({})
                .every((_key, value) => Number.isInteger(value)), true);
});