import Vector from "./Vector.js";

export default class Fruit {

    game;
    palette;
    location;

    constructor(game, ...palette) {
        this.game = game;
        this.palette = palette;
        this.update();
    }

    update() {
        let intersect;
        do {
            this.location = Vector.random().multiply(this.game.land.size).truncate();
            intersect = false;
            for (let index = 0; index < this.game.snake.body.length; index++) {
                if (this.game.snake.body[index].distance(this.location) === 0) {
                    intersect = true;
                    break;
                }
            }
        } while (intersect);
    }

    render() {
        const context = this.game.canvas.getContext('2d');

        const pixel = this.location.clone().multiply(this.game.tile);

        const halfTile = this.game.tile / 2;

        context.beginPath();
        context.arc(
            pixel.x + halfTile,
            pixel.y + halfTile,
            this.game.tile / 2,
            0,
            Math.PI * 2
        );
        context.closePath();
        context.fillStyle = this.palette[0];
        context.fill();

        const thirdTile = this.game.tile / 3;

        context.beginPath();
        context.arc(
            pixel.x + thirdTile,
            pixel.y + thirdTile,
            this.game.tile / 8,
            0,
            Math.PI * 2
        );
        context.closePath();
        context.fillStyle = this.palette[1];
        context.fill();

    }

}