import Vector from "./Vector.js";

export default class Snake {

    static LEFT = new Vector(-1, 0);
    static UP = new Vector(0, -1);
    static RIGHT = new Vector(1, 0);
    static DOWN = new Vector(0, 1);

    game;
    palette;
    direction;
    body;

    get head() {
        return this.body[0];
    }

    constructor(game, ...palette) {
        this.game = game;
        this.palette = palette;
        this.direction = Snake.RIGHT;
        this.body = [
            new Vector(7, 5),
            new Vector(6, 5),
            new Vector(5, 5),
            new Vector(4, 5),
            new Vector(3, 5),
            new Vector(2, 5),
            new Vector(1, 5),
        ];
    }

    isDead() {
        const target = this.head.clone().add(this.direction);
        if (target.x < 0 || target.x >= this.game.land.size.x || target.y < 0 || target.y >= this.game.land.size.y)
            return true;
        for (let index = 1; index < this.body.length; index++) {
            if (this.body[index].distance(this.head) === 0) {
                return true;
            }
        }
        return false;
    }


    eat() {
        const target = this.head.clone().add(this.direction);
        if (this.game.fruit.location.distance(target) === 0) {
            this.body.unshift(target);
            this.game.fruit.update();
            return true;
        }
        return false;
    }

    update() {
        if (this.isDead()) {
            this.game.over();
        } else if (!this.eat()) {
            this.body.unshift(this.head.clone().add(this.direction));
            this.body.pop();
        }
    }

    render() {
        const context = this.game.canvas.getContext('2d');
        const halfTile = this.game.tile / 2;
        const quarterTile = this.game.tile / 4;
        const eighthTile = this.game.tile / 8;

        let pixel;

        for (let index = this.body.length - 1; index >= 0; index--) {
            pixel = this.body[index].clone().multiply(this.game.tile);
            context.beginPath();
            context.arc(
                pixel.x + halfTile,
                pixel.y + halfTile,
                halfTile,
                0,
                Math.PI * 2
            );
            context.closePath();
            context.fillStyle = this.palette[index % 2];
            context.fill();
        }

        switch (this.direction) {
            case Snake.LEFT:
            case Snake.RIGHT:

                context.fillStyle = "white";

                context.beginPath();
                context.arc(
                    pixel.x + halfTile,
                    pixel.y + quarterTile,
                    quarterTile,
                    0,
                    Math.PI * 2
                );
                context.closePath();
                context.fill();

                context.beginPath();
                context.arc(
                    pixel.x + halfTile,
                    pixel.y + halfTile + quarterTile,
                    quarterTile,
                    0,
                    Math.PI * 2
                );
                context.closePath();
                context.fill();

                context.fillStyle = "black";

                context.beginPath();
                context.arc(
                    pixel.x + halfTile,
                    pixel.y + quarterTile,
                    eighthTile,
                    0,
                    Math.PI * 2
                );
                context.closePath();
                context.fill();

                context.beginPath();
                context.arc(
                    pixel.x + halfTile,
                    pixel.y + halfTile + quarterTile,
                    eighthTile,
                    0,
                    Math.PI * 2
                );
                context.closePath();
                context.fill();

                break;
            case Snake.UP:
            case Snake.DOWN:

                context.fillStyle = "white";

                context.beginPath();
                context.arc(
                    pixel.x + quarterTile,
                    pixel.y + halfTile,
                    quarterTile,
                    0,
                    Math.PI * 2
                );
                context.closePath();
                context.fill();

                context.beginPath();
                context.arc(
                    pixel.x + halfTile + quarterTile,
                    pixel.y + halfTile,
                    quarterTile,
                    0,
                    Math.PI * 2
                );
                context.closePath();
                context.fill();

                context.fillStyle = "black";

                context.beginPath();
                context.arc(
                    pixel.x + quarterTile,
                    pixel.y + halfTile,
                    eighthTile,
                    0,
                    Math.PI * 2
                );
                context.closePath();
                context.fill();

                context.beginPath();
                context.arc(
                    pixel.x + halfTile + quarterTile,
                    pixel.y + halfTile,
                    eighthTile,
                    0,
                    Math.PI * 2
                );
                context.closePath();
                context.fill();

                break;
        }

    }

}

        // switch (this.direction) {
        //     case Snake.LEFT:
        //         context.fillRect(pixel.x + halfTile, pixel.y, halfTile, this.game.tile);
        //         context.beginPath();
        //         context.arc(
        //             pixel.x + halfTile,
        //             pixel.y + halfTile,
        //             this.game.tile / 2,
        //             +Math.PI / 2,
        //             -Math.PI / 2
        //         );
        //         context.closePath();
        //         context.fillStyle = this.palette[0];
        //         context.fill();
        //         break;
        //     case Snake.UP:
        //         context.fillRect(pixel.x, pixel.y + halfTile, this.game.tile, halfTile);
        //         context.beginPath();
        //         context.arc(
        //             pixel.x + halfTile,
        //             pixel.y + halfTile,
        //             this.game.tile / 2,
        //             Math.PI,
        //             0
        //         );
        //         context.closePath();
        //         context.fillStyle = this.palette[0];
        //         context.fill();
        //         break;
        //     case Snake.RIGHT:
        //         context.fillRect(pixel.x, pixel.y, halfTile, this.game.tile);
        //         context.beginPath();
        //         context.arc(
        //             pixel.x + halfTile,
        //             pixel.y + halfTile,
        //             this.game.tile / 2,
        //             -Math.PI / 2,
        //             +Math.PI / 2
        //         );
        //         context.closePath();
        //         context.fillStyle = this.palette[0];
        //         context.fill();
        //         break;
        //     case Snake.DOWN:
        //         context.fillRect(pixel.x, pixel.y, this.game.tile, halfTile,);
        //         context.beginPath();
        //         context.arc(
        //             pixel.x + halfTile,
        //             pixel.y + halfTile,
        //             this.game.tile / 2,
        //             0,
        //             Math.PI
        //         );
        //         context.closePath();
        //         context.fillStyle = this.palette[0];
        //         context.fill();
        //         break;
        // }