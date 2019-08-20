{
    function Pokemon() {
        Object.call(this);
    }

    Pokemon.prototype = {
        getType: function () {
            return this.element;
        },
        getSpecie: function () {
            return this.specie;
        },
        canFly: function () {
            return this.flying;
        },
        getPokemonType: function () {
            return this.constructor.name;
        },
        evolve: function () {
            if (Object.getPrototypeOf(Object.getPrototypeOf(this)).constructor.name === 'ElectricPokemon' ||
                Object.getPrototypeOf(Object.getPrototypeOf(this)).constructor.name === 'FirePokemon') {
                return this;
            }
            return Object.create(Object.getPrototypeOf(Object.getPrototypeOf(this)));
        }
    }

    function FirePokemon() {
        Pokemon.call(this);
    }

    FirePokemon.prototype = Object.create(Pokemon.prototype, {
        element: {
            value: 'Fire'
        }
    });
    FirePokemon.prototype.constructor = FirePokemon;

    function Charizard() {
        FirePokemon.call(this);
    }
    Charizard.prototype = Object.create(FirePokemon.prototype, {
        flying: {
            value: true
        },
        specie: {
            value: 'Flame Pokemon'
        }
    });
    Charizard.prototype.constructor = Charizard;

    function Charmeleon() {
        Charizard.call(this);
    }
    Charmeleon.prototype = Object.create(Charizard.prototype, {
        flying: {
            value: false
        }
    });
    Charmeleon.prototype.constructor = Charmeleon;

    function Charmander() {
        Charmeleon.call(this);
    }
    Charmander.prototype = Object.create(Charmeleon.prototype, {
        specie: {
            value: 'Lizard Pokemon'
        }
    });
    Charmander.prototype.constructor = Charmander;

    function ElectricPokemon() {
        Pokemon.call(this);
    }
    ElectricPokemon.prototype = Object.create(Pokemon.prototype, {
        element: {
            value: 'Electric'
        },
        flying: {
            value: false
        }
    });
    ElectricPokemon.prototype.constructor = ElectricPokemon;

    function Raichu() {
        ElectricPokemon.call(this);
    }
    Raichu.prototype = Object.create(ElectricPokemon.prototype, {
        specie: {
            value: 'Mouse Pokemon'
        }
    });
    Raichu.prototype.constructor = Raichu;

    function Pikachu() {
        Raichu.call(this);
    }
    Pikachu.prototype = Object.create(Raichu.prototype);
    Pikachu.prototype.constructor = Pikachu;

    function Pichu() {
        Pikachu.call(this);
    }
    Pichu.prototype = Object.create(Pikachu.prototype);
    Pichu.prototype.constructor = Pichu;

    console.group('Task 3');
    console.group('Fire Pokemons');
    const charmander = new Charmander();
    const charmeleon = new Charmeleon();
    const charizard = new Charizard();
    console.log(charmander.getType()); // -> “Fire”
    console.log(charmander.getType() === charmeleon.getType()); // -> true
    console.log(charmeleon.getType() === charizard.getType()); // -> true

    console.log(charmander.evolve().constructor === Charmeleon); // -> true
    console.log(charmeleon.evolve().constructor === Charizard); // -> true

    console.log(charmander.getSpecie()); // -> “Lizard Pokémon”
    console.log(charmeleon.getSpecie()); // -> “Flame Pokémon”
    console.log(charizard.getSpecie() === charmeleon.getSpecie()); // -> true

    console.log(charmander.canFly()); // -> false
    console.log(charmander.canFly() === charmeleon.canFly()); // -> true
    console.log(charizard.canFly()); // -> true
    console.groupEnd();

    console.group('Electric Pokemons');
    const pichu = new Pichu();
    console.log(pichu.getPokemonType()); // => Pichu

    const pikachu = pichu.evolve();
    console.log(pikachu.getPokemonType()); // Pikachu
    console.log(pikachu.constructor === Pikachu); // true

    const raichu = pikachu.evolve();
    console.log(raichu.getPokemonType()); // Raichu
    console.log(raichu.constructor === Raichu); // true

    const raichu2 = raichu.evolve(); // return raichu back as it's maximum level
    console.log(raichu2 === raichu); // true
    console.groupEnd();
    console.groupEnd();
}
