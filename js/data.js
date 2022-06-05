var playerPokemon, enemyPokemon, playerImage, enemyImage, superpower, symbols, backgroundImage, playerImageAnimation, moveInfoImage, curmoveoverlay;
var moves = [];
var hovering = [];
var showmoves = true;
var types = ["Fighting", "Poison", "Fire", "Flying"];
var typecolors = ["#f0818e", "#b168d1", "#C3803B", "#7298C6"];
var dynamaxColor = "#F25356";
var curenemy = 0;
var skipRestOfTurn = false;
var inGameOver = false;
var inPlayAgian = false;
var waitingforplayagian = false;
var pokemondata = {
    "Pancham": {
        "BaseStats": {
            "HP": 1,
            "Attack": 1,
            "Defense": 1,
            "SpecialAttack": 1,
            "SpecialDefense": 1,
            "Speed": 1
        },
        "Types": {
            "Primary": "Fighting",
            "Secondary": "None"
        },
        "Image": {
            "Path": "pancham/back.png"
        }
    },
    "OldPancham": {
        "BaseStats": {
            "HP": 30,
            "Attack": 50,
            "Defense": 30,
            "SpecialAttack": 50,
            "SpecialDefense": 30,
            "Speed": 50
        },
        "Types": {
            "Primary": "Fighting",
            "Secondary": "None"
        },
        "Image": {
            "Path": "pancham/back.png"
        }
    },
    "OldPancham2": {
        "BaseStats": {
            "HP": 10,
            "Attack": 40,
            "Defense": 10,
            "SpecialAttack": 40,
            "SpecialDefense": 10,
            "Speed": 10
        },
        "Types": {
            "Primary": "Fighting",
            "Secondary": "None"
        },
        "Image": {
            "Path": "pancham/back.png"
        }
    },
    "OldPancham3": {
        "BaseStats": {
            "HP": 20,
            "Attack": 80,
            "Defense": 20,
            "SpecialAttack": 80,
            "SpecialDefense": 20,
            "Speed": 20
        },
        "Types": {
            "Primary": "Fighting",
            "Secondary": "None"
        },
        "Image": {
            "Path": "pancham/back.png"
        }
    },
    "Kubfu": {
        "BaseStats": {
            "HP": 40,
            "Attack": 125,
            "Defense": 250,
            "SpecialAttack": 250,
            "SpecialDefense": 250,
            "Speed": 250
        },
        "Types": {
            "Primary": "Fighting",
            "Secondary": "None"
        },
        "Image": {
            "Path": "kubfu/front.png"
        }
    },
    "Pangoro": {
        "BaseStats": {
            "HP": 95,
            "Attack": 124,
            "Defense": 78,
            "SpecialAttack": 69,
            "SpecialDefense": 71,
            "Speed": 58
        },
        "Types": {
            "Primary": "Fighting",
            "Secondary": "Dark"
        },
        "Image": {
            "Path": "pangoro/back.png"
        }
    },
    "Charizard": {
        "BaseStats": {
            "HP": 1,
            "Attack": 84,
            "Defense": 1,
            "SpecialAttack": 109,
            "SpecialDefense": 85,
            "Speed": 1,
        },
        "Types": {
            "Primary": "Fire",
            "Secondary": "Flying"
        },
        "Image": {
            "Path": "charizard/back.gif"
        }
    },
    "FusedCastform": {
        "BaseStats": {
            "HP": 280,
            "Attack": 280,
            "Defense": 280,
            "SpecialAttack": 280,
            "SpecialDefense": 280,
            "Speed": 280,
        },
        "Types": {
            "Primary": "Dragon",
            "Secondary": "Ground"
        },
        "Image": {
            "Path": "pancham/back.png"
        }
    }


};
/* "Charizard": {
        "BaseStats": {
            "HP": 78,
            "Attack": 84,
            "Defense": 78,
            "SpecialAttack": 104,
            "SpecialDefense": 85,
            "Speed": 100
        },
        "Types": {
            "Primary": "Fire",
            "Secondary": "Flying"
        }
    }*/

var movesdata = [{
        "pp": 8,
        "power": 120,
        "type": "Fighting",
        "name": "Superpower",
        "special": false
    }, {
        "pp": 8,
        "power": 120,
        "type": "Poison",
        "name": "Gunk Shot",
        "special": false
    },
    {
        "pp": 8,
        "power": 110,
        "type": "Fire",
        "name": "Fire Blast",
        "special": true
    },
    {
        "pp": 24,
        "power": 70,
        "type": "Flying",
        "name": "Air Slash",
        "special": true
    },
    {
        "pp": 8,
        "power": 400,
        "type": "Normal",
        "name": "OLD",
        "special": true
    }

];
var dynamaxMoves = [{
        "type": "Flying",
        "name": "Max Airstream",
        "power": {
            "Air Slash": 130,
            "Dragon Ascent": 140
        },
        "special": {
            "Air Slash": true,
            "Dragon Ascent": false
        }
    },
    {
        "type": "Fire",
        "name": "Max Flare",
        "power": {
            "Blast Burn": 150,
            "Blaze Kick": 130,
            "Blue Flare": 140,
            "Burn Up": 140,
            "Burning Jealousy": 120,
            "Fiery Dance": 130,
            "Fire Blast": 140,
            "Fire Fang": 120,
            "Fire Lash": 130,
            "Fire Pledge": 130,
            "Fire Punch": 130,
            "Fire Spin": 90,
            "Flame Charge": 100,
            "Flame Wheel": 110,
            "Flare Blitz": 140,
            "Fusion Flare": 130,
            "Heat Crash": 130,
            "Heat Wave": 130,
            "Lava Plume": 130,
            "Magma Storm": 130,
            "Mind Blown": 150,
            "Mystical Fire": 130,
            "Pyro Ball": 140,
            "Sacred Fire": 130,
            "Searing Shot": 130,
            "Shell Trap": 150,
            "V-create": 150,
            "Ember": 90,
            "Eruption": 150,
            "Flamethrower": 130,
            "Incinerate": 110,
            "Inferno": 130,
            "Overheat": 140

        },
        "special": {
            "Blast Burn": true,
            "Blaze Kick": false,
            "Blue Flare": true,
            "Burn Up": true,
            "Burning Jealousy": true,
            "Fiery Dance": true,
            "Fire Blast": true,
            "Fire Fang": false,
            "Fire Lash": false,
            "Fire Pledge": true,
            "Fire Punch": false,
            "Fire Spin": true,
            "Flame Charge": false,
            "Flame Wheel": false,
            "Flare Blitz": false,
            "Fusion Flare": true,
            "Heat Crash": false,
            "Heat Wave": true,
            "Lava Plume": true,
            "Magma Storm": true,
            "Mind Blown": true,
            "Mystical Fire": true,
            "Pyro Ball": false,
            "Sacred Fire": false,
            "Searing Shot": true,
            "Shell Trap": true,
            "V-create": false,
            "Ember": true,
            "Eruption": true,
            "Flamethrower": true,
            "Incinerate": true,
            "Inferno": true,
            "Overheat": true
        }
    }

];
var movedescriptions = [{
    "name": "Fire Blast",
    "desc": "The target is attacked with an intense blast of all-consuming fire. This may also leave the target with a burn."
}]

function getMoveDesc(name) {
    for (var i = 0; i < movedescriptions.length; i++) {
        if (movedescriptions[i].name === name) {
            return movedescriptions[i].desc;
        }
    }
}

var pokemonimages = {};