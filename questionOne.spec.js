const questionOne = require('./questionOne');
const assert = require('assert');

console.log('deepclone unit tests');

function should_clone_a_POJO_object() {
    console.log('should clone a POJO object');
    const src = {
        foo: 'bar',
        bar: {
            baz: {
                qux: 'qux'
            }
        },
        qux: [1, 'foo', 3.14, { bar: 'baz' }]
    };

    const target = questionOne.deepClone(src);

    assert.deepEqual(src, target);
    assert.notStrictEqual(src, target);
    assert.notStrictEqual(src.bar, target.bar);
    assert.notStrictEqual(src.bar.baz, target.bar.baz);
};

function should_return_the_provided_argument_if_it_is_not_an_object() {
    console.log('should return the provided argument if it is not an object');
    for (var arg of [undefined, null, 3.14, 123, 'foobar']) {
        assert.strictEqual(arg, questionOne.deepClone(arg));
    }
};

function scalar_values() {
    console.log('scalar values');
    const src = {
        str: 'foobar',
        int: 123,
        float: 3.14,
        bool: false,
        nil: null,
        undef: undefined
    };

    const cloned = questionOne.deepClone(src);

    assert.deepEqual(src, cloned);

    for (var key of Object.keys(src)) {
        assert.strictEqual(src[key], cloned[key]);
    }
};

function clone_date() {
    console.log('clone: Date');
    const src = {
        foo: 'bar',
        bar: 123,
        baz: new Date()
    };

    const cloned = questionOne.deepClone(src);

    assert.deepEqual(src, cloned);
};

should_clone_a_POJO_object();
should_return_the_provided_argument_if_it_is_not_an_object();
scalar_values();
clone_date();
