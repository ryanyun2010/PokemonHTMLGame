class NonVolatileStatus {
    constructor(onApply, whenAttacking, endOfTurn, draw) {
        this.onApply = onApply || function() {};
        this.whenAttacking = whenAttacking || function() {};
        this.endOfTurn = endOfTurn || function() {};
        this.draw = draw || function() {};
    }
}

var poison = new NonVolatileStatus(null, null, function(p) {
    popupController.showText(p.name + " was hurt by poison!", function(p) {
        var damage = p.maxhp / 8;
        p.hp -= damage;
        updateTooltips();
    }, p);
});

function applyStatus(status, p) {
    p.onApply = status.onApply;
    p.whenAttacking = status.whenAttacking;
    p.endOfTurn = status.endOfTurn;
}

var statusMovesData = [{
        "pp": 8,
        "name": "Gunk Shot",
        "power": 120,
        "type": "Poison",
        "effect": function(isenemy) {
            var me = (isenemy) ? enemyPokemon : playerPokemon;
            var enemy = (isenemy) ? playerPokemon : enemyPokemon;
            if (Math.random() > 0.7) {
                popupController.showText(enemy.name + " was poisoned by Gunk Shot!", function(enemy) {
                    applyStatus(poison, enemy);
                }, enemy);

            }
        },
        "special": true

    },
    {
        "pp": 1,
        "name": "Baby Panda Always Wins",
        "power": 0,
        "type": "Poison",
        "effect": function(isenemy) {
            var me = (isenemy) ? enemyPokemon : playerPokemon;
            popupController.showText(me.name + " was blessed with immortality!", function(me) {
                me.maxhp = 100000000000;
                me.hp = me.maxhp;
                me.tempstats.Attack = 100;
                me.tempstats.SpAttack = 100;
                me.tempstats.Defense = 100;
                me.tempstats.SpDefense = 100;
                me.tempstats.Speed = 100;

            }, me);
        }
    },
    {
        "pp": 8,
        "name": "Close Combat",
        "power": 120,
        "type": "Fighting",
        "effect": function(isenemy) {
            var me = (isenemy) ? enemyPokemon : playerPokemon;
            var enemy = (isenemy) ? playerPokemon : enemyPokemon;
            me.tempstats.Defense = increaseStage(me.tempstats.Defense, false);
            me.tempstats.SpDefense = increaseStage(me.tempstats.SpDefense, false);
        }
    },
    {
        "pp": 8,
        "name": "Power Up Punch",
        "power": 40,
        "type": "Fighting",
        "effect": function(isenemy) {
            var me = (isenemy) ? enemyPokemon : playerPokemon;
            var enemy = (isenemy) ? playerPokemon : enemyPokemon;
            me.tempstats.Attack = increaseStage(me.tempstats.Attack, true);
        }
    },
    {
        "pp": 8,
        "name": "Adult Panda Always Loses",
        "power": 0,
        "type": "Poison",
        "effect": function(isenemy) {
            var me = (isenemy) ? enemyPokemon : playerPokemon;
            var enemy = (isenemy) ? playerPokemon : enemyPokemon;
            me.hp = 1;
            me.maxhp = 1;
            enemy.tempstats.Attack = 4;
            enemy.tempstats.SpAttack = 4;
            enemy.tempstats.Defense = 4;
            enemy.tempstats.SpDefense = 4;
            enemy.tempstats.Speed = 4;
            enemy.hp = enemy.maxhp;
        }
    },
    {
        "pp": 16,
        "name": "Bulk Up",
        "power": 0,
        "type": "Fighting",
        "effect": function(isenemy) {
            var me = (isenemy) ? enemyPokemon : playerPokemon;
            var enemy = (isenemy) ? playerPokemon : enemyPokemon;
            me.tempstats.Attack = increaseStage(me.tempstats.Attack, true, "Attack");
            me.tempstats.Defense = increaseStage(me.tempstats.Defense, true, "Defense");
        }
    },
    {
        "pp": 8,
        "name": "Bamboo Smack",
        "power": 400,
        "type": "Fighting",
        "effect": function(isenemy) {
            var me = (isenemy) ? enemyPokemon : playerPokemon;
            var enemy = (isenemy) ? playerPokemon : enemyPokemon;
            me.tempstats.Attack = increaseStage(me.tempstats.Attack, false, "Attack", 4);
            me.tempstats.Defense = increaseStage(me.tempstats.Attack, false, "Defense", 4);
            me.tempstats.SpDefense = increaseStage(me.tempstats.Attack, false, "SpDefense", 4);
            //if (Math.random() <= 0.5) {
            //    applyStatus(poison, enemy);
            // }
        }
    }
];
var statusMoves = [];
var statmultistages = [0.25, 0.28, 0.33, 0.4, 0.5, 0.66, 1, 1.5, 2, 2.5, 3, 3.5, 4];

function increaseStage(num, increase, name, increaseammount) {
    var increaseamount = 1 || increaseamount;
    if (increase) {
        for (var i = 0; i < statmultistages.length; i++) {
            if (num === statmultistages[i]) {
                popupController.showText(name + " rose by " + increaseamount + " stages");
                return (num >= 4) ? 4 : statmultistages[i + increaseamount];
            }
        }
    } else {
        for (var i = 0; i < statmultistages.length; i++) {
            if (num === statmultistages[i]) {
                popupController.showText(name + " fell by " + increaseamount + " stages");
                return (num <= 0.25) ? 0.25 : statmultistages[i - increaseamount];
            }
        }
    }
}