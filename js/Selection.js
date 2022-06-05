function pokemonSelected(etarget, plist) {
    var pokemonname = "";
    if (etarget.src) {
        pokemonname = etarget.id.split('pimg')[0];
    } else if (etarget.id.includes("pst")) {
        pokemonname = etarget.id.split('pst')[0];
    } else if (etarget.id.includes("pokemonbox")) {
        pokemonname = plist[parseInt(etarget.id.split('pokemonbox')[0])].name;
    }
    console.log(pokemonname);
    usePokemon(pokemonname);
}

function usePokemon(name) {
    if (P("#curplayerpokemon").elems[0] != null) {
        P("#curplayerpokemon").elems[0].remove();
    }
    playerPokemon = new pokemon[name](true);
    console.log(playerPokemon);
    showmoves = true;
    P("#PSSCD").hide();
    updateTooltips();
}

function pokemonSelectionScreen() {
    console.log("panda")
    var pokemon = [
        { "name": "Pancham", "img": "pancham/back.png" },
        { "name": "Pangoro", "img": "pangoro/front.png" },
        { "name": "Charizard", "img": "charizard/back.gif" },
        { "name": "Kubfu", "img": "kubfu/front.png" },
    ];
    showmoves = false;
    if (inPlayAgian) {
        P("#PSSCD").show();
        inPlayAgian = false;
        for (var i = 0; i < pokemon.length; i++) {
            document.getElementById(i + "pokemonbox").addEventListener("click", function(e) {
                pokemonSelected(e.target, pokemon);
                console.log("test")
            });
            P("#" + pokemon[i].name + "pimg").click(function(e) {
                pokemonSelected(e.target, pokemon);
                console.log("test");
            });
            P("#" + pokemon[i].name + "pst").click(function(e) {
                pokemonSelected(e.target, pokemon);
                console.log("test")
            });

        }
        return;
    }
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.width = "100vw";
    div.style.height = "100vh";
    div.style.backgroundColor = "black";
    div.style.zIndex = "9999999";
    div.id = "PSSCD";
    document.querySelector("body").appendChild(div);


    for (var i = 0; i < pokemon.length; i++) {
        P().image("img/pokemon/" + pokemon[i].img, pokemon[i].name + "pimg", 200 + i * 1200 / pokemon.length, 200, 200, 200, "#PSSCD");
        P().drawText(pokemon[i].name, pokemon[i].name + "pst", 230 + i * 1200 / pokemon.length, 400, 30, "sans-serif", "black", "auto", "auto", "#PSSCD");
        var box = document.createElement("div");
        box.style.position = "absolute";
        box.style.left = 190 + i * 1200 / pokemon.length + "px";
        box.style.top = "180px";
        box.style.width = "200px";
        box.style.height = "270px";
        box.style.backgroundColor = "#cfcfcf";
        box.style.borderColor = "#444444";
        box.style.borderRadius = "50px";
        box.style.borderWidth = "10px";
        box.style.borderStyle = "solid";
        box.style.zIndex = 10000000;
        box.id = i + "pokemonbox";
        var etarget;
        box.addEventListener("click", function(e) {
            pokemonSelected(e.target, pokemon);
        });
        P("#" + pokemon[i].name + "pimg").click(function(e) {
            pokemonSelected(e.target, pokemon);
        });
        P("#" + pokemon[i].name + "pst").click(function(e) {
            pokemonSelected(e.target, pokemon);
        });

        document.querySelector("#PSSCD").appendChild(box);


    }
}