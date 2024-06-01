export class Dot {
    constructor(game,x, y, radius,speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.game = game;
        this.speed = speed;
        this.level = this.game.place.level;
        this.tileSize = this.game.tileSize;
        this.dx = Math.random() * speed - speed / 2;
        this.dy = Math.random() * speed - speed / 2;
        this.terminate = false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        this.controlWall(this.x, this.y);
    }

    controlWall(x, y) {
        let row = Math.floor(y / this.tileSize);
        let col = Math.floor(x / this.tileSize);

        if (row >= 0 && row < this.level.length && col >= 0 && col < this.level[0].length) {
            if (this.level[row][col]) {
                if (this.x - this.radius < col * this.tileSize || this.x + this.radius > (col + 1) * this.tileSize) {
                    this.dx = -this.dx; // Invertuje směr horizontálního pohybu
                }
                if (this.y - this.radius < row * this.tileSize || this.y + this.radius > (row + 1) * this.tileSize) {
                    this.dy = -this.dy; // Invertuje směr vertikálního pohybu
                }
            }
        }
    }


}