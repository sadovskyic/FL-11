{
    function create(proto, ...propertiesObject) {
        let obj = Object.setPrototypeOf({}, proto);
        propertiesObject.forEach(desc => {
            if (typeof desc === 'object') {
                obj = Object.defineProperties(obj, desc);
            }
        });
        return obj;
    }

    const obj1 = { prop: 5 };
    const obj2 = create(obj1);
    const obj3 = create(obj1, {
        'property1': {
            value: 1,
            writable: false,
            enumerable: false,
            configurable: false
        },
        'property2': {
            value: '2',
            writable: true,
            enumerable: true,
            configurable: true
        }
    });

    console.group('Task 2');
    console.log(Object.getPrototypeOf(obj2) === obj1); // => true
    console.log(obj2.prop); // => 5
    console.log(obj3);
    console.groupEnd();
}