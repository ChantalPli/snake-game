import Land from "./Land.js";
import Fruit from "./Fruit.js";
import Snake from "./Snake.js";
import Vector from "./Vector.js";

export default class Game {

    canvas;
    tile;
    land;
    fruit;
    snake;
    interval;

    constructor(width, height) {

        this.canvas = document.createElement("canvas");

        window.addEventListener("resize", event => {
            this.tile = Math.floor(Math.min(window.innerWidth / width, window.innerHeight / height));
            this.canvas.width = this.tile * width;
            this.canvas.height = this.tile * height;
        }, false);
        window.dispatchEvent(new Event("resize"));

        document.addEventListener("keydown", event => {
            switch (event.key) {
                case "ArrowLeft":
                    if (!this.snake.direction.clone().add(Snake.LEFT).isNull())
                        this.snake.direction = Snake.LEFT;
                    break;
                case "ArrowDown":
                    if (!this.snake.direction.clone().add(Snake.DOWN).isNull())
                        this.snake.direction = Snake.DOWN;
                    break;
                case "ArrowRight":
                    if (!this.snake.direction.clone().add(Snake.RIGHT).isNull())
                        this.snake.direction = Snake.RIGHT;
                    break;
                case "ArrowUp":
                    if (!this.snake.direction.clone().add(Snake.UP).isNull())
                        this.snake.direction = Snake.UP;
                    break;
            }
        }, false);

        this.land = new Land(this, width, height, "#4CAF50", "#8BC34A");
        this.snake = new Snake(this, "#F44336", "#FFC107");
        this.fruit = new Fruit(this, "#9C27B0", "#BA68C8");
        this.interval = null;

    }

    update() {
        this.snake.update();
    }

    render() {
        this.land.render();
        this.fruit.render();
        this.snake.render();
        if (this.interval === null) {
            const context = this.canvas.getContext('2d');
            context.lineWidth = 3;
            context.fillStyle = "white";
            context.strokeStyle = "black";
            context.font = "bold 6em Arial";
            context.textAlign = "center";
            context.textBaseline = "center";
            context.fillText("Game over", this.canvas.width / 2, this.canvas.height / 2);
            context.strokeText("Game over", this.canvas.width / 2, this.canvas.height / 2);
        }
    }

    start() {
        this.interval = setInterval(() => {
            this.update();
            this.render();
        }, 300);
    }

    over() {
        clearInterval(this.interval);
        this.interval = null;
    }

}