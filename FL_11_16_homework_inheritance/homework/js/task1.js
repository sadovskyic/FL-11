{
    function assign(target, ...sources) {
        for (let source of sources) {
            let keys = Object.keys(source);
            keys.forEach(prop => {
                if (typeof source[prop] === 'object') {
                    target[prop] = assign({}, source[prop]);
                } else {
                    target[prop] = source[prop];
                }
            });
        }
        return target;
    }

    const defaults = { a: 123, b: 777 };
    const options = { a: 456 };
    const configs = assign({}, defaults, options); // => {a: 456, b: 777}

    const obj1 = { a: 0, b: { c: 0 } };
    const obj2 = assign({}, obj1);
    obj2.b.c = 3;

    console.group('Task 1');
    console.log(configs);
    console.log(obj1); // { a: 0, b: { c: 0}}
    console.log(obj2); // { a: 0, b: { c: 3}}
    console.groupEnd();
}