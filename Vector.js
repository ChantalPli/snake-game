export default class Vector {

    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(this.dot(this));
    }

    set magnitude(value) {
        this.multiply(value / this.magnitude);
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    add(value) {
        if (value instanceof Vector) {
            // this.x = this.x + value.x;
            // this.y = this.y + value.y;
            this.x += value.x;
            this.y += value.y;
        } else {
            this.x += value;
            this.y += value;
        }
        return this;
    }

    subtract(value) {
        if (value instanceof Vector) {
            this.x -= value.x;
            this.y -= value.y;
        } else {
            this.x -= value;
            this.y -= value;
        }
        return this;
    }

    multiply(value) {
        if (value instanceof Vector) {
            this.x *= value.x;
            this.y *= value.y;
        } else {
            this.x *= value;
            this.y *= value;
        }
        return this;
    }

    divide(value) {
        if (value instanceof Vector) {
            this.x /= value.x;
            this.y /= value.y;
        }
        else {
            this.x /= value.x;
            this.y /= value.y;
        }
        return this;
    }

    distance(vector) {
        return this.clone().subtract(vector).magnitude;
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    truncate() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    isNull() {
        return this.magnitude == 0;
    }

    static random() {
        return new Vector(Math.random(), Math.random());
    }

}

// const u = Vector.random();
// console.log(u);

// const u = new Vector(4, 3);
// console.log(u.magnitude);
// u.magnitude = 10;
// console.log(u);

// const u = new Vector(3, 6);
// u.add(5);
// console.log(JSON.stringify(u));// (8, 11)
// const v = new Vector(2, 4);
// u.add(v);
// console.log(JSON.stringify(u));// (10, 15)
