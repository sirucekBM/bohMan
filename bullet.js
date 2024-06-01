export class Bullet{
    constructor(game, x, y, vector){
        this.game= game;
        this.tileSize = this.game.tileSize;
        this.level = this.game.place.level;
        this.speed = 5;
        this.x = x;
        this.y = y;
        this.vector = vector;
        this.move = true;
    }

    draw(ctx) {
        if(this.move){
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.closePath();
        }
    }

    update(){
        if(this.move){
            let tempX = this.x;
            let tempY = this.y;
            switch (this.vector) {
                case "u":
                    tempY -= this.speed;
                    break;
                case "d":
                    tempY += this.speed;
                    break;
                case "l":
                    tempX -= this.speed;
                    break;
                case "r":
                    tempX += this.speed;
                    break;
            }
            this.controlWall(tempX, tempY);
            this.controlColisionWithDot();
        }
    }

    controlColisionWithDot(){
        this.game.dotsArray.forEach(element => {
            const dx = this.x - element.x;
            const dy = this.y - element.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const radius = 2.5;
        
            if(distance <= radius * 2){
                element.terminate = true;
            }
            
        });
    }



    controlWall(x,y){
        let row = Math.floor(y / this.tileSize);
        let col = Math.floor(x / this.tileSize);
        
        if (row >= 0 && row < this.level.length && col >= 0 && col < this.level[0].length) {
            if (!this.level[row][col]) {
                this.x = x;
                this.y = y;
            }else{
                this.move = false;
            }
        }
    }

}