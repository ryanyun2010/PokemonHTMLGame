function preload() {
    for (var p in pokemondata) {
        if (pokemondata[p].Image.Path.split(".")[1] === "gif") {
            pokemonimages[p] = createImg("img/pokemon/" + pokemondata[p].Image.Path).position(-1000, -1000);

        } else {
            pokemonimages[p] = loadImage("img/pokemon/" + pokemondata[p].Image.Path);
        }
    }

    playerImage = loadImage("img/pokemon/charizard/back.gif");
    playerImageAnimation = createImg("img/pokemon/charizard/back.gif");
    enemyImage = loadImage("img/pokemon/pangoro/front.png");
    backgroundImage = loadImage("img/background.jpg");
    gameOverImage = loadImage("img/GAMEOVER.png");


    symbols = [];
    for (var curtype of types) {
        symbols.push(loadImage("img/moves/symbols/" + curtype + ".png"));
    }
}


function setup() {
    console.log("Test");
    createMoves();

    for (var m of statusMovesData) {
        statusMoves.push(new PokemonMove(m.pp, m.power, m.type, m.name, m.special, m.effect, m.statustext));
        console.log(statusMoves);
    }
    enemyPokemon = new Pokemon("Pangoro", { "HP": 31, "Atk": 31, "Def": 31, "Speed": 31 }, { "HP": 252, "Atk": 252, "Def": 252, "Speed": 252 }, 700, 235, 300, 300, enemyImage, [moves[0], moves[1]], true, false);
    playerPokemon = new Pokemon("Pangoro", { "HP": 31, "Atk": 31, "Def": 31, "Speed": 31 }, { "HP": 252, "Atk": 252, "Def": 252, "Speed": 252 }, 0, 200, 150, 200, playerImageAnimation, [moves[2], moves[3], statusMoves[0]], false, true);
    console.log(playerPokemon);
    updateTooltips();
    if (!inPlayAgian) { createCanvas(1100, 800); }
    P("#dynamaxbutton").click(function() {
        console.log("test")
        if (showmoves && playerPokemon.dynamaxUsed === false) {
            console.log("test2")
            playerPokemon.dynamax = true;
            playerPokemon.dynamaxTurns = 4;
            playerPokemon.dynamaxUsed = true;
            playerPokemon.maxMoves();
        }
    })
    pokemonSelectionScreen();
    P("body").click(function() {

        if (inGameOver) {
            setTimeout(function() {
                if (!waitingforplayagian) {
                    playAgian();
                    waitingforplayagian = true;
                }
            }, 1000);
        } else if (inPlayAgian) {
            createCanvas(1100, 800);
            console.log("hwuhfwiuhfwiuefwhufewhufwhweuyg");
            playerPokemon,
            enemyPokemon,
            superpower,
            symbols,
            playerImageAnimation,
            moveInfoImage,
            curmoveoverlay = null;
            moves = [];
            hovering = [];
            showmoves = true;
            types = ["Fighting", "Poison", "Fire", "Flying"];
            typecolors = ["#f0818e", "#b168d1", "#C3803B", "#7298C6"];
            dynamaxColor = "#F25356";
            curenemy = 0;
            popupController.queue = [];
            skipRestOfTurn = false;
            inGameOver = false;
            createMoves();
            enemyPokemon = new Pokemon("Pangoro", { "HP": 31, "Atk": 31, "Def": 31, "Speed": 31 }, { "HP": 252, "Atk": 252, "Def": 252, "Speed": 252 }, 700, 235, 300, 300, enemyImage, [moves[0], moves[1]], true, false);
            playerPokemon = new Pokemon("Charizard", { "HP": 31, "Atk": 31, "Def": 31, "Speed": 31 }, { "HP": 252, "Atk": 252, "Def": 252, "Speed": 252 }, 0, 200, 150, 200, playerImageAnimation, [moves[2], moves[3], statusMoves[0]], false, true);
            P(".playagian").hide();
            P(".gameover").hide();
            P("#popupimg").hide();
            P("#popuptext").hide();
            P("#playertooltip").show();
            pokemonSelectionScreen();
        }
    })
}



function draw() {
    //  background(0);
    //  image(backgroundImage, 0, 0, 1100, 800);
    if (enemyPokemon.alive) { enemyPokemon.draw(); }
    if (playerPokemon.alive) {
        playerPokemon.draw();
        if (showmoves) {
            if (playerPokemon.dynamaxUsed === false) {
                P("#dynamaxbutton").css("visibility", "visible")
            } else {
                P("#dynamaxbutton").css("visibility", "hidden")
            }

            for (var move of playerPokemon.moveset) {
                move.draw();
            }
        } else {
            P("#dynamaxbutton").css("visibility", "hidden")
        }

    }

}

function mouseClicked() {
    for (var move of moves) {
        move.checkClick();
    }
    for (var move of statusMoves) {
        move.checkClick();
    }
}
var onmove;

function mouseMoved() {
    onmove = false;
    for (var move of playerPokemon.moveset) {
        move.checkHover();

    }
    if (onmove === false) {
        clearMoveOverlay();
    }
}

function updateTooltips() {
    P("#enemytooltip .healthbar div").css("width", (enemyPokemon.hp / enemyPokemon.maxhp) * 100 + "%");
    P("#playertooltip .healthbar div").css("width", (playerPokemon.hp / playerPokemon.maxhp) * 100 + "%");
    P(".healthtext").html(playerPokemon.hp + "/" + playerPokemon.maxhp);
    P("#playertooltip p").html(playerPokemon.name);
}

function gameOver() {
    inGameOver = true;
    waitingforplayagian = false;
    P("body").elems[0].innerHTML += "<img src='img/GAMEOVER.png' class = 'gameover'>";
}

function playAgian() {
    inPlayAgian = true;
    inGameOver = false;
    P(".gameover").hide();
    P("body").elems[0].innerHTML += "<img src='img/GAMEOVER.png' class = 'playagian'>";
}