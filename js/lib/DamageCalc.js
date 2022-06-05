function Calc(pokemon1, pokemon2, pow, movetype, weather, healthivs, healthevs, atkivs, atkevs, defivs, defevs, naturebuff, naturedebuff, special, mytempstats, enemytempstats) {
    var multis = FindMultipliers(pokemon1, pokemon2, pow, movetype, weather, healthivs, healthevs, atkivs, atkevs, defivs, defevs, naturebuff, naturedebuff, special, mytempstats, enemytempstats);
    return CheckDmg(multis[0], multis[1], multis[2], multis[3], multis[4], multis[5], multis[6], multis[7]);

}

function CheckDmg(health, atk, def, pow, weathermult, stabmult, effectivemult, othermult) {
    var truedmg = (pow === 0) ? 0 : (((42 * pow * (atk / def)) / 50) + 2) * weathermult * 1 * stabmult * effectivemult * othermult;
    var effdmg = Math.floor(truedmg)
    var percentage = Math.floor((effdmg / health) * 100)
    return {
        "MinPercent": Math.floor((effdmg / health) * 85),
        "MaxPercent": percentage,
        "MinDamage": Math.floor(truedmg * 0.85),
        "MaxDamage": effdmg,
    }
}

function FindStats(pokemon, stat, ivs, evs, naturebuff, naturedebuff, tempstats) {
    tempstats = tempstats || {
        "Speed": 1,
        "Attack": 1,
        "Defense": 1,
        "SpAttack": 1,
        "SpDefense": 1
    }
    if (stat === "HP") {
        return (2 * GetData(pokemon, "HP") + ivs + Math.floor(evs / 4)) + 110;
    }
    if (stat === "Attack") {
        return (((2 * GetData(pokemon, "Attack")) + ivs + Math.floor(evs / 4) + 5) * ((naturebuff === "Attack") ? 1.1 : (naturedebuff === "Attack") ? 0.9 : 1)) * tempstats.Attack;
    }
    if (stat === "Defense") {
        return (((2 * GetData(pokemon, "Defense")) + ivs + Math.floor(evs / 4) + 5) * ((naturebuff === "Defense") ? 1.1 : (naturedebuff === "Defense") ? 0.9 : 1)) * tempstats.Defense;
    }
    if (stat === "SpecialAttack") {
        return ((2 * GetData(pokemon, "SpecialAttack") + ivs + Math.floor(evs / 4) + 5) * ((naturebuff === "SpecialAttack") ? 1.1 : (naturedebuff === "SpecialAttack") ? 0.9 : 1)) * tempstats.SpAttack;
    }
    if (stat === "SpecialDefense") {
        return ((2 * GetData(pokemon, "SpecialDefense") + ivs + Math.floor(evs / 4) + 5) * ((naturebuff === "SpecialDefense") ? 1.1 : (naturedebuff === "SpecialDefense") ? 0.9 : 1)) * tempstats.SpDefense;
    }
    if (stat === "Speed") {
        return ((2 * GetData(pokemon, "Speed") + ivs + Math.floor(evs / 4) + 5) * ((naturebuff === "Speed") ? 1.1 : (naturedebuff === "Speed") ? 0.9 : 1)) * tempstats.Speed;
    }
}

function FindMultipliers(pokemon1, pokemon2, pow, movetype, weather, healthivs, healthevs, atkivs, atkevs, defivs, defevs, naturebuff, naturedebuff, special, mytempstats, enemytempstats) {
    var health = FindStats(pokemon2, "HP", healthivs, healthevs, naturebuff, naturedebuff)
    var attack = (special) ? FindStats(pokemon1, "SpecialAttack", atkivs, atkevs, naturebuff, naturedebuff, mytempstats) : FindStats(pokemon1, "Attack", atkivs, atkevs, naturebuff, naturedebuff, mytempstats);
    var defense = (special) ? FindStats(pokemon2, "SpecialDefense", defivs, defevs, naturebuff, naturedebuff, enemytempstats) : FindStats(pokemon2, "Defense", defivs, defevs, naturebuff, naturedebuff, enemytempstats);
    var power = pow;
    if (movetype === "Fire" && weather === "Sun") { var weathermult = 1.5; }
    if (movetype === "Fire" && weather === "Rain") { var weathermult = 0.5; }
    if (movetype === "Water" && weather === "Sun") { var weathermult = 0.5; }
    if (movetype === "Water" && weather === "Rain") { var weathermult = 1.5; } else { var weathermult = 1; }
    var stabmult = (GetData(pokemon1, "PrimaryType") === movetype || GetData(pokemon1, "SecondaryType") === movetype) ? 1.5 : 1;
    var effectivemult = FindTypeMult(movetype, GetData(pokemon2, "PrimaryType"), GetData(pokemon2, "SecondaryType"))
    var othermult = 1;
    return [health, attack, defense, power, weathermult, stabmult, effectivemult, othermult]
}

function GetData(pokemonname, info) {
    var pokedata = pokemondata[pokemonname];
    return (info === "HP") ? pokedata.BaseStats.HP : (info === "Attack") ? pokedata.BaseStats.Attack : (info === "Defense") ? pokedata.BaseStats.Defense : (info === "SpecialAttack") ? pokedata.BaseStats.SpecialAttack : (info === "SpecialDefense") ? pokedata.BaseStats.SpecialDefense : (info === "PrimaryType") ? pokedata.Types.Primary : (info === "SecondaryType") ? pokedata.Types.Secondary : (info === "Speed") ? pokedata.BaseStats.Speed : 0;
}

var typemulti = {
    "Normal": {
        "Normal": 1,
        "Fire": 1,
        "Water": 1,
        "Electric": 1,
        "Grass": 1,
        "Ice": 1,
        "Fighting": 1,
        "Poison": 1,
        "Ground": 1,
        "Flying": 1,
        "Psychic": 1,
        "Bug": 1,
        "Rock": 0.5,
        "Ghost": 0,
        "Dragon": 1,
        "Dark": 1,
        "Steel": 0.5,
        "Fairy": 1,
        "None": 1
    },
    "Fire": {
        "Normal": 1,
        "Fire": 0.5,
        "Water": 0.5,
        "Electric": 1,
        "Grass": 2,
        "Ice": 2,
        "Fighting": 1,
        "Poison": 1,
        "Ground": 1,
        "Flying": 1,
        "Psychic": 1,
        "Bug": 2,
        "Rock": 0.5,
        "Ghost": 1,
        "Dragon": 0.5,
        "Dark": 1,
        "Steel": 2,
        "Fairy": 1,
        "None": 1
    },
    "Water": {
        "Normal": 1,
        "Fire": 2,
        "Water": 0.5,
        "Electric": 1,
        "Grass": 0.5,
        "Ice": 1,
        "Fighting": 1,
        "Poison": 1,
        "Ground": 2,
        "Flying": 1,
        "Psychic": 1,
        "Bug": 1,
        "Rock": 2,
        "Ghost": 1,
        "Dragon": 0.5,
        "Dark": 1,
        "Steel": 1,
        "Fairy": 1,
        "None": 1
    },
    "Electric": {
        "Normal": 1,
        "Fire": 1,
        "Water": 2,
        "Electric": 0.5,
        "Grass": 0.5,
        "Ice": 1,
        "Fighting": 1,
        "Poison": 1,
        "Ground": 0,
        "Flying": 2,
        "Psychic": 1,
        "Bug": 1,
        "Rock": 1,
        "Ghost": 1,
        "Dragon": 0.5,
        "Dark": 1,
        "Steel": 1,
        "Fairy": 1,
        "None": 1
    },
    "Grass": {
        "Normal": 1,
        "Fire": 0.5,
        "Water": 2,
        "Electric": 1,
        "Grass": 0.5,
        "Ice": 1,
        "Fighting": 1,
        "Poison": 0.5,
        "Ground": 2,
        "Flying": 0.5,
        "Psychic": 1,
        "Bug": 0.5,
        "Rock": 2,
        "Ghost": 1,
        "Dragon": 0.5,
        "Dark": 1,
        "Steel": 0.5,
        "Fairy": 1,
        "None": 1
    },
    "Ice": {
        "Normal": 1,
        "Fire": 0.5,
        "Water": 0.5,
        "Electric": 1,
        "Grass": 2,
        "Ice": 0.5,
        "Fighting": 1,
        "Poison": 1,
        "Ground": 2,
        "Flying": 2,
        "Psychic": 1,
        "Bug": 1,
        "Rock": 1,
        "Ghost": 1,
        "Dragon": 2,
        "Dark": 1,
        "Steel": 0.5,
        "Fairy": 1,
        "None": 1
    },
    "Fighting": {
        "Normal": 2,
        "Fire": 1,
        "Water": 1,
        "Electric": 1,
        "Grass": 1,
        "Ice": 2,
        "Fighting": 1,
        "Poison": 0.5,
        "Ground": 1,
        "Flying": 0.5,
        "Psychic": 0.5,
        "Bug": 0.5,
        "Rock": 1,
        "Ghost": 1,
        "Dragon": 1,
        "Dark": 2,
        "Steel": 2,
        "Fairy": 0.5,
        "None": 1
    },
    "Poison": {
        "Normal": 1,
        "Fire": 1,
        "Water": 1,
        "Electric": 1,
        "Grass": 2,
        "Ice": 1,
        "Fighting": 1,
        "Poison": 0.5,
        "Ground": 0.5,
        "Flying": 1,
        "Psychic": 1,
        "Bug": 1,
        "Rock": 0.5,
        "Ghost": 0.5,
        "Dragon": 1,
        "Dark": 1,
        "Steel": 0,
        "Fairy": 2,
        "None": 1
    },
    "Ground": {
        "Normal": 1,
        "Fire": 2,
        "Water": 1,
        "Electric": 2,
        "Grass": 0.5,
        "Ice": 1,
        "Fighting": 1,
        "Poison": 2,
        "Ground": 1,
        "Flying": 0,
        "Psychic": 1,
        "Bug": 0.5,
        "Rock": 2,
        "Ghost": 1,
        "Dragon": 1,
        "Dark": 1,
        "Steel": 2,
        "Fairy": 1,
        "None": 1
    },
    "Flying": {
        "Normal": 1,
        "Fire": 1,
        "Water": 1,
        "Electric": 0.5,
        "Grass": 2,
        "Ice": 1,
        "Fighting": 2,
        "Poison": 1,
        "Ground": 1,
        "Flying": 1,
        "Psychic": 1,
        "Bug": 2,
        "Rock": 0.5,
        "Ghost": 1,
        "Dragon": 1,
        "Dark": 1,
        "Steel": 0.5,
        "Fairy": 1,
        "None": 1
    },
    "Psychic": {
        "Normal": 1,
        "Fire": 1,
        "Water": 1,
        "Electric": 1,
        "Grass": 1,
        "Ice": 1,
        "Fighting": 2,
        "Poison": 2,
        "Ground": 1,
        "Flying": 1,
        "Psychic": 0.5,
        "Bug": 1,
        "Rock": 1,
        "Ghost": 1,
        "Dragon": 1,
        "Dark": 0,
        "Steel": 0.5,
        "Fairy": 1,
        "None": 1
    },
    "Bug": {
        "Normal": 1,
        "Fire": 0.5,
        "Water": 1,
        "Electric": 1,
        "Grass": 2,
        "Ice": 1,
        "Fighting": 0.5,
        "Poison": 0.5,
        "Ground": 1,
        "Flying": 0.5,
        "Psychic": 2,
        "Bug": 1,
        "Rock": 1,
        "Ghost": 0.5,
        "Dragon": 1,
        "Dark": 2,
        "Steel": 0.5,
        "Fairy": 0.5,
        "None": 1
    },
    "Rock": {
        "Normal": 1,
        "Fire": 2,
        "Water": 1,
        "Electric": 1,
        "Grass": 1,
        "Ice": 2,
        "Fighting": 0.5,
        "Poison": 1,
        "Ground": 0.5,
        "Flying": 2,
        "Psychic": 1,
        "Bug": 2,
        "Rock": 1,
        "Ghost": 1,
        "Dragon": 1,
        "Dark": 1,
        "Steel": 0.5,
        "Fairy": 1,
        "None": 1
    },
    "Ghost": {
        "Normal": 0,
        "Fire": 1,
        "Water": 1,
        "Electric": 1,
        "Grass": 1,
        "Ice": 1,
        "Fighting": 1,
        "Poison": 1,
        "Ground": 1,
        "Flying": 1,
        "Psychic": 1,
        "Bug": 2,
        "Rock": 1,
        "Ghost": 2,
        "Dragon": 1,
        "Dark": 0.5,
        "Steel": 1,
        "Fairy": 1,
        "None": 1
    },
    "Dragon": {
        "Normal": 1,
        "Fire": 1,
        "Water": 1,
        "Electric": 1,
        "Grass": 1,
        "Ice": 1,
        "Fighting": 1,
        "Poison": 1,
        "Ground": 1,
        "Flying": 1,
        "Psychic": 1,
        "Bug": 1,
        "Rock": 1,
        "Ghost": 1,
        "Dragon": 2,
        "Dark": 1,
        "Steel": 0.5,
        "Fairy": 0,
        "None": 1
    },
    "Dark": {
        "Normal": 1,
        "Fire": 1,
        "Water": 1,
        "Electric": 1,
        "Grass": 1,
        "Ice": 1,
        "Fighting": 0.5,
        "Poison": 1,
        "Ground": 1,
        "Flying": 1,
        "Psychic": 2,
        "Bug": 1,
        "Rock": 1,
        "Ghost": 2,
        "Dragon": 1,
        "Dark": 0.5,
        "Steel": 1,
        "Fairy": 0.5,
        "None": 1
    },
    "Steel": {
        "Normal": 1,
        "Fire": 0.5,
        "Water": 0.5,
        "Electric": 0.5,
        "Grass": 1,
        "Ice": 2,
        "Fighting": 1,
        "Poison": 1,
        "Ground": 1,
        "Flying": 1,
        "Psychic": 1,
        "Bug": 1,
        "Rock": 2,
        "Ghost": 1,
        "Dragon": 1,
        "Dark": 1,
        "Steel": 0.5,
        "Fairy": 2,
        "None": 1
    },
    "Fairy": {
        "Normal": 1,
        "Fire": 0.5,
        "Water": 1,
        "Electric": 1,
        "Grass": 1,
        "Ice": 1,
        "Fighting": 2,
        "Poison": 0.5,
        "Ground": 1,
        "Flying": 1,
        "Psychic": 1,
        "Bug": 1,
        "Rock": 1,
        "Ghost": 1,
        "Dragon": 2,
        "Dark": 2,
        "Steel": 0.5,
        "Fairy": 1,
        "None": 1
    },
    "None": {
        "Normal": 1,
        "Fire": 1,
        "Water": 1,
        "Electric": 1,
        "Grass": 1,
        "Ice": 1,
        "Fighting": 1,
        "Poison": 1,
        "Ground": 1,
        "Flying": 1,
        "Psychic": 1,
        "Bug": 1,
        "Rock": 1,
        "Ghost": 1,
        "Dragon": 1,
        "Dark": 1,
        "Steel": 1,
        "Fairy": 1,
        "None": 1
    }

}

function FindTypeMult(type, opponentfirsttype, opponentsecondtype) {
    eval("var typemultiplier = (typemulti." + type + "." + opponentfirsttype + ")*(typemulti." + type + "." + opponentsecondtype + ")")
    return typemultiplier
}