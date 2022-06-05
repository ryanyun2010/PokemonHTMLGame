function drawMoveOverlay(move) {
    curmoveoverlay = move;
    clearMoveOverlay();
    P().image("img/MoveInfo.png", "mi", 0, 200, 700, 150);
    P().drawText((move.power == 0) ? "N/A" : move.power, "mip", 130, 292, 18, "sans-serif", "#595959");
    P().drawText(move.accuracy * 100 + "%", "mia", 130, 314, 18, "sans-serif", "#595959");
    P().drawText((move.power == 0) ? "Status" : (move.special) ? "Special" : "Physical", "mis", 130, 265, 18, "sans-serif", "#595959");
    P().drawText(getMoveDesc(move.name), "mid", 200, 267, 18, "sans-serif", "#595959", 400);
    P().drawText(move.name, "min", 200, 210, 30, "sans-serif", "white");
    P().image("img/moves/symbols/" + move.type + ".png", "misy", 35, 210, 25, 25);
    P().drawText(move.type.toUpperCase(), "mit", 65, 214, 20, "sans-serif", move.color);
}

function clearMoveOverlay() {
    P("#mi").remove();
    P("#mip").remove();
    P("#mia").remove();
    P("#mis").remove();
    P("#mid").remove();
    P("#min").remove();
    P("#misy").remove();
    P("#mit").remove();
}