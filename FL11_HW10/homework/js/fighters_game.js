function Fighter({name, damage, hp, agility}) {
    const defaultFighterProperties = {
        name: 'Nameless',
        damage: 10,
        hp: 100,
        agility: 1
    },
        absoluteChance = 100,
        _name = name || defaultFighterProperties.name,
        _damage = damage || defaultFighterProperties.damage,
        _agility = agility || defaultFighterProperties.agility,
        _maxHP = hp || defaultFighterProperties.hp;
    let _currentHP = _maxHP,
        wins = 0,
        losses = 0;
    this.getName = () => _name;
    this.getHealth = () => _currentHP;
    this.getAgility = () => _agility;
    this.getDamage = () => _damage;
    this.dealDamage = damage => {
        _currentHP -= damage;
        if (_currentHP < 0) {
            _currentHP = 0;
        }
    }
    this.attack = defender => {
        if (Math.random() < defender.getAgility() / absoluteChance) {
            console.log(`${_name} attack missed`);
        } else {
            defender.dealDamage(_damage);
            console.log(`${_name} make ${_damage} damage to ${defender.getName()}`);
        }
    }
    this.heal = HP => {
        _currentHP += HP;
        if (_currentHP > _maxHP) {
            _currentHP = _maxHP;
        }
    }
    this.addWin = () => ++wins;
    this.addLoss = () => ++losses;
    this.logCombatHistory = () => `Name: ${_name}, Wins: ${wins}, Losses: ${losses}`;
}
function battle(fighter1, fighter2) {
    for (let i = 0; i < arguments.length; i++) {
        if (!arguments[i].getHealth()) {
            console.log(`${arguments[i].getName()} is dead and can't fight.`);
            return;
        }
    }
    let order = 0,
        canFight = true;
    while (canFight) {
        if (!order) {
            fighter1.attack(fighter2);
            if (!fighter2.getHealth()) {
                canFight = false;
                fighter1.addWin();
                fighter2.addLoss();
            }
            order++;
        } else {
            fighter2.attack(fighter1);
            if (!fighter1.getHealth()) {
                canFight = false;
                fighter2.addWin();
                fighter1.addLoss();
            }
            order--;
        }
    }
}
let fighter1 = new Fighter({name: 'John', damage: 20, hp: 100, agility: 25});
let fighter2 = new Fighter({name: 'Jim', damage: 10, hp: 120, agility: 40});
battle(fighter1, fighter2);
console.log(fighter1.getHealth());
console.log(fighter2.getHealth());
console.log(fighter1.logCombatHistory());
console.log(fighter2.logCombatHistory());
battle(fighter1, fighter2);