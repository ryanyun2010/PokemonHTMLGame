function copyArray(array) {
    var array2 = [];
    for (var i = 0; i < array.length; i++) {
        array2.push(array[i]);
    }
    return array2;
}
class Pokemon {
    constructor(name, ivs, evs, x, y, w, h, img, moveset, enemy, animated) {

        this.name = name;
        this.img = img;
        this.evs = evs;
        this.ivs = ivs;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.hp = (2 * GetData(this.name, "HP") + this.ivs.HP + (this.evs.HP / 4)) + 110;
        this.alive = true;
        this.maxhp = this.hp;
        this.enemy = enemy;
        this.moveset = moveset;
        this.prevmoveset = copyArray(moveset);
        this.animated = animated;
        for (var i = 0; i < this.moveset.length; i++) {
            this.moveset[i].slot = i;
            this.moveset[i].y = 500 + i * 85
        }
        this.dynamax = false;
        this.dynamaxTurns = 1;
        this.dynamaxUsed = false;
        this.tempstats = {
            "Attack": 1,
            "Defense": 1,
            "SpAttack": 1,
            "SpDefense": 1,
            "Speed": 1
        }

    }
    onStatusApply() {

    }
    whenAttacking() {

    }
    endOfTurn() {

    }
    draw() {
        if (this.animated) {
            this.img.position(this.x, this.y);
            this.img.id("curplayerpokemon");
        } else {
            image(this.img, this.x, this.y, this.w, this.h);
        }
    }
    calcDamage(data, p) {
        console.log(this.tempstats)
        return Calc(this.name, p.name, data.move.power, data.move.type, data.weather, this.ivs.HP, this.evs.HP, this.ivs.Atk, this.evs.Atk, this.ivs.Def, this.evs.Def, "None", "None", data.move.special, this.tempstats, (this.enemy) ? playerPokemon.tempstats : enemyPokemon.tempstats);
    }
    dealDamage(data, p) {
        data = this.calcDamage(data, p);
        p.hp -= data.MaxDamage;
        skipRestOfTurn = false;
        if (p.hp <= 0) {
            p.hp = 0;
            p.alive = false;
            if (p.enemy) {
                if (curenemy === 0) {
                    enemyPokemon = new OldPancham(false);
                    P("#name").elems[0].innerHTML = "Elderly Pancham";
                } else if (curenemy === 1) {
                    enemyPokemon = new OldPancham2(false);
                    P("#name").elems[0].innerHTML = "Old Pancham";
                } else if (curenemy === 2) {
                    enemyPokemon = new OldPancham3(false);
                    P("#name").elems[0].innerHTML = "Aged Pancham";
                }
                curenemy++;
                skipRestOfTurn = true;

            } else {
                P("#playertooltip").hide();
                gameOver();
            }
            updateTooltips()
        }
    }
    useMove(move) {
        this.whenAttacking();
        if (this.dynamax) {
            this.dynamaxTurns--;
        }
        if (this.dynamaxTurns <= 0 && this.dynamaxUsed) {
            this.dynamax = false;
            this.maxMoves();
        }
        var movedata = {
            "move": {
                "power": move.power,
                "type": move.type,
                "special": move.special,
            },
            "weather": "None"
        };

        if (this.alive) {
            if (skipRestOfTurn === true) { skipRestOfTurn = false; return; };
            popupController.showText(this.name + " used " + move.name + "!", function(pokemon, data, effect) {

                if (pokemon.enemy) {

                    console.log(skipRestOfTurn);
                    console.log(pokemon);
                    pokemon.dealDamage(data, playerPokemon);

                } else {
                    pokemon.dealDamage(data, enemyPokemon);

                }
                effect(pokemon.enemy);

                updateTooltips();
            }, this, movedata, move.effect);
        }

    }
    randomMove() {
        console.log(this)
        var move = this.moveset[floor(random(0, this.moveset.length))];
        this.useMove(move);
    }
    maxMoves() {
        if (this.dynamax) {
            for (var i = 0; i < this.moveset.length; i++) {
                this.moveset[i] = new PokemonMove(this.moveset[i].pp, dynamaxMoves[this.getDynamaxIndex(this.moveset[i].type)].power[this.moveset[i].name], this.moveset[i].type, dynamaxMoves[this.getDynamaxIndex(this.moveset[i].type)].name, dynamaxMoves[this.getDynamaxIndex(this.moveset[i].type)].special[this.moveset[i].name]);
                this.moveset[i].slot = i;
                this.moveset[i].y = 500 + i * 85
            }
        } else {
            this.moveset = this.prevmoveset;
        }
    }
    getDynamaxIndex(type) {
        for (var i = 0; i < dynamaxMoves.length; i++) {
            if (dynamaxMoves[i].type === type) {
                return i;
            }
        }
    }

}