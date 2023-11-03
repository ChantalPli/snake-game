import Vector from "./Vector.js";

export default class Land {

    game;
    size;
    palette;

    constructor(game, width, height, ...palette) {
        this.game = game;
        this.size = new Vector(width, height);
        this.palette = palette;
    }

    colorAt(row, column) {
        return this.palette[(row + column) % this.palette.length];
    }

    render() {
        const context = this.game.canvas.getContext('2d');
        for (let row = 0; row < this.size.y; row++) {
            for (let column = 0; column < this.size.x; column++) {
                const pixel = new Vector(column, row).multiply(this.game.tile);
                context.fillStyle = this.colorAt(row, column);
                context.fillRect(
                    pixel.x,
                    pixel.y,
                    this.game.tile,
                    this.game.tile
                );
            }
        }
    }

}