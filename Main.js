import Game from "./Game.js";

document.addEventListener("DOMContentLoaded", event => {

    const game = new Game(20, 20);

    document.body.appendChild(game.canvas);

    game.start();

}, false);
