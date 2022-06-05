class Charizard extends Pokemon {
    constructor(player) {
        super("Charizard", { "HP": 31, "Atk": 31, "Def": 31, "Speed": 31 }, { "HP": 252, "Atk": 252, "Def": 252, "Speed": 252 }, (player) ? 0 : 700, (player) ? 200 : 235, (player) ? 150 : 300, (player) ? 200 : 300, pokemonimages["Charizard"], [moves[2], moves[3], statusMoves[0]], !player, true);
    }
}
class Pancham extends Pokemon {
    constructor(player) {
        super("Pancham", { "HP": 31, "Atk": 31, "Def": 31, "Speed": 31 }, { "HP": 252, "Atk": 252, "Def": 252, "Speed": 252 }, (player) ? 100 : 700, (player) ? 300 : 235, (player) ? 300 : 300, (player) ? 400 : 300, pokemonimages["Pancham"], [moves[0], moves[1], statusMoves[6]], !player, false);
    }
}
class Pangoro extends Pokemon {
    constructor(player) {
        super("Pangoro", { "HP": 31, "Atk": 31, "Def": 31, "Speed": 31 }, { "HP": 252, "Atk": 252, "Def": 252, "Speed": 252 }, (player) ? 100 : 700, (player) ? 300 : 235, (player) ? 500 : 300, (player) ? 500 : 300, pokemonimages["Pangoro"], [moves[2], moves[3]], !player, false);
    }
}
class Kubfu extends Pokemon {
    constructor(player) {
        super("Kubfu", { "HP": 31, "Atk": 31, "Def": 31, "Speed": 31 }, { "HP": 252, "Atk": 252, "Def": 252, "Speed": 252 }, (player) ? 100 : 700, (player) ? 300 : 235, (player) ? 500 : 300, (player) ? 500 : 300, pokemonimages["Kubfu"], [moves[0], statusMoves[3], statusMoves[5]], !player, false);
    }
}
class MegaDynamaxedEternamaxedUltraZygardeCompleteFusedWithXerneasAndYveltal extends Pokemon {
    constructor(player) {
        super("Kubfu", { "HP": 31, "Atk": 31, "Def": 31, "Speed": 31 }, { "HP": 252, "Atk": 252, "Def": 252, "Speed": 252 }, (player) ? 100 : 700, (player) ? 300 : 235, (player) ? 500 : 300, (player) ? 500 : 300, pokemonimages["Pancham"], [moves[0], statusMoves[3], statusMoves[5]], !player, false);
    }
}
class OldPancham extends Pancham {
    constructor(player) {
        super(player);
        this.name = "OldPancham";
        this.moveset = [
            moves[0],

        ];
    }
}


class OldPancham2 extends OldPancham {
    constructor(player) {
        super(player);
        this.name = "OldPancham2";
    }
}

class OldPancham3 extends OldPancham {
    constructor(player) {
        super(player);
        this.name = "OldPancham3";
    }
}
var pokemon = {
    "Pancham": Pancham,
    "Charizard": Charizard,
    "Pangoro": Pangoro,
    "Kubfu": Kubfu
};