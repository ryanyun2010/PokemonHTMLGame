function createMoves() {
    for (var i = 0; i < movesdata.length; i++) {
        var curmove = movesdata[i];
        moves.push(new PokemonMove(curmove.pp, curmove.power, curmove.type, curmove.name, curmove.special));
    }
}
var curmoveid = 0;
class PokemonMove {
    constructor(pp, power, type, name, special, effect) {
        this.type = type;
        this.name = name;
        this.dynamax = this.name.includes("Max") || this.name.includes("G-Max");
        this.color = (!this.dynamax) ? typecolors[this.getTypeIndex()] : dynamaxColor;
        this.symbol = symbols[this.getTypeIndex()];
        this.pp = pp;
        this.maxpp = pp;
        this.slot = null;
        this.x = 620;
        this.y = 0;
        this.w = 450;
        this.h = 75;
        this.power = power;
        this.special = special;
        this.effect = effect || function(arg1, arg2, arg3) {};
        this.accuracy = 0.85;
        this.id = curmoveid;
        curmoveid++;
    }

    draw() {
        fill(this.color);
        noStroke();
        rect(this.x, this.y, this.w, this.h, 70, 70, 70, 70);
        fill("black");
        quad(this.x + this.w * (2 / 3), this.y, this.x + this.w * (3 / 5), this.y + this.h, this.x + this.w * (9 / 10), this.y + this.h, this.x + this.w * (9 / 10), this.y);
        rect(this.x + this.w * (2 / 3), this.y, this.w / 3, this.h, 70, 70, 70, 70);
        image(this.symbol, this.x + 20, this.y + 6, this.h * (4 / 5), this.h * (4 / 5));
        if (this.dynamax) { fill("white"); }
        textSize(28);
        textStyle(1500);
        text(this.name, this.x + this.h * (4 / 5) + 35, this.y + this.h / 2 + this.h / 9.375);
        fill("white");
        text(this.pp + "/" + this.maxpp, this.x + this.w * (3 / 4), this.y + this.h / 2 + this.h / 9.375);
        stroke("black");
        console.log(this);
    }

    checkClick() {
        console.log("hgfwihfeiwuhfeuwinjmdvashjvhgvhgsvfhsdvhgfs");
        console.log(mouseX, mouseY, this.x, this.y)
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h && showmoves) {

            console.log("hgfwfeiuhfwehifuwhfsuigyahubnjkfshjgytgufhkihsjgdvfyiaukhiihfeiwuhfeuwinjmdvashjvhgvhgsvfhsdvhgfs");
            if (FindStats(playerPokemon.name, "Speed", playerPokemon.ivs.Speed, playerPokemon.evs.Speed, "None", "None") > FindStats(enemyPokemon.name, "Speed", enemyPokemon.ivs.Speed, enemyPokemon.evs.Speed, "None", "None")) {
                playerPokemon.useMove(playerPokemon.moveset[this.slot]);
                updateTooltips();
                enemyPokemon.randomMove();
            } else {
                enemyPokemon.randomMove();
                playerPokemon.useMove(playerPokemon.moveset[this.slot]);
                updateTooltips();
            }
            playerPokemon.endOfTurn(playerPokemon);
            enemyPokemon.endOfTurn(enemyPokemon);
            updateTooltips();
        }
    }

    checkHover() {
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h && showmoves) {
            onmove = true;
            if (curmoveoverlay != this) {
                drawMoveOverlay(this);
            }
        }

    }

    getTypeIndex() {
        console.log(types, this.type);
        for (var i = 0; i < types.length; i++) {
            if (types[i] == this.type) {
                return i;
            }
        }
    }
}