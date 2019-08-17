function Hamburger(type = 'classic', calorie = 600, withSecretIngredient = false) {

    const ingredientCalories = {
        cheese: 120,
        tomato: 20,
        'secret ingredient': 100
    },
        maxAmount = {
            cheese: 1,
            tomato: 2,
            'secret ingredient': 1
        },
        ingredients = {};
    function excessMessage(maxAmount, ingredient, afterOthers) {

        switch (maxAmount) {
            case 1: return `Sorry, you can add ${ingredient.name} only once.`;
            case 2: return `Sorry, you can add ${ingredient.name} only twice.`;
            default:
                if (afterOthers) {
                    return `Sorry, you can add ${ingredient.name} only before another ingredients.`;
                }
                return `Sorry, you cannot add ${ingredient.name}.`;
        }

    }
    class Ingridient {
        constructor(calories, maxAmount, name) {
            this.calories = calories;
            this.maxAmount = maxAmount || 1;
            this.name = name;
        }
    }
    for (let ingredient in ingredientCalories) {
        ingredients[ingredient] = new Ingridient(ingredientCalories[ingredient], maxAmount[ingredient], ingredient);
    }

    let calories = calorie,
        bites = 0;
    this.type = type;

    this.getCalories = () => calories;

    this.setCalories = numberOfCalories => calories = numberOfCalories;

    function addIngridient(ingredient) {
        if (bites) {
            console.log(excessMessage(null, ingredient));
            return;
        }
        if (this.counter !== ingredient.maxAmount) {
            this.counter++;
            calories += ingredient.calories;
        } else {
            console.log(excessMessage(ingredient.maxAmount, ingredient));
        }
    }

    this.addCheese = () => {
        addIngridient.call(this.addCheese, ingredients.cheese);
    };


    this.addTomato = () => {
        addIngridient.call(this.addTomato, ingredients.tomato);
    };

    this.addSecretIngredient = () => {
        let isBeforeOthers = !this.addCheese.counter && !this.addTomato.counter;
        if (isBeforeOthers) {
            addIngridient.call(this.addSecretIngredient, ingredients['secret ingredient']);
        } else if (bites) {
            console.log(excessMessage(null, ingredients['secret ingredient']));
        } else {
            console.log(excessMessage(null, ingredients['secret ingredient'], !isBeforeOthers))
        }
    };

    this.bite = () => bites++;

    this.addCheese.counter = 0;
    this.addTomato.counter = 0;
    this.addSecretIngredient.counter = 0;

    if (withSecretIngredient) {
        this.addSecretIngredient();
    }

    function capitalize(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    this.info = () => {
        function concatenate(str) {
            if (_with) {
                return str = ', ' + str;
            }
            _with = ': ';
            return str;
        }
        let _with = '',
            secret = '',
            tomato = '',
            cheese = '',
            bite = '';

        if (this.addSecretIngredient.counter) {
            secret = concatenate('with secret ingredient');
        }
        if (this.addCheese.counter) {
            cheese = concatenate('with cheese');
        }
        if (this.addTomato.counter) {
            tomato = concatenate(`with ${this.addTomato.counter} tomato`);
        }
        if (bites) {
            bite = concatenate(`is bites ${bites} times`);
        }
        return `${capitalize(this.type)} hamburger${_with}${secret}${cheese}${tomato}${bite}. Total calories ${calories}.`;
    };
}

const myHamburger = new Hamburger();

console.group('Hamburger');
console.log(myHamburger);

console.log(myHamburger.getCalories());
myHamburger.setCalories(700);
console.log(myHamburger.getCalories());

myHamburger.addSecretIngredient();
console.log(myHamburger.getCalories());
myHamburger.addSecretIngredient();

myHamburger.addCheese();
console.log(myHamburger.getCalories());
myHamburger.addCheese();

myHamburger.addTomato();
console.log(myHamburger.getCalories());
myHamburger.addTomato();
console.log(myHamburger.getCalories());
myHamburger.addTomato();

myHamburger.addSecretIngredient();

myHamburger.bite();
myHamburger.bite();
myHamburger.bite();
myHamburger.addTomato();

console.log(myHamburger.info());
console.groupEnd();

const myHamburger2 = new Hamburger('big', 800, true);

console.group('Hamburger with secret ingredient in the making')
console.log(myHamburger2.getCalories());
myHamburger2.addSecretIngredient();
myHamburger2.bite();
myHamburger2.addTomato();
myHamburger2.addCheese();
myHamburger2.addSecretIngredient();
console.log(myHamburger2.info());
console.groupEnd();