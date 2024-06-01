export class Player{
    constructor(game){
        this.game= game;
        this.tileSize = this.game.tileSize;
        this.level = this.game.place.level;
        this.x = 0;
        this.y = 0;
        this.startAngle = 1.0//do prava -0.6 || do leva 2.7 ||na horu 4.0 || dolu 1.0
        this.angleCoef = 0.7// do  prava 0.25 || do leva 1.2 ||na horu 1.7 || dolu 0.7
        this.numberOfShots= 100;
        this.shot = false;
        this.lives = game.lives;
        this.vector = "d";
        this.placePlayerOn();
    }

    draw(ctx) {
        var endAngle = Math.PI * this.angleCoef;
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x + this.tileSize / 2, this.y + this.tileSize / 2, this.tileSize / 4, 0, Math.PI * 2);
        ctx.fill();
    
        //vysec
        ctx.beginPath();
        ctx.moveTo(this.x + this.tileSize / 2, this.y + this.tileSize / 2);
        ctx.arc(this.x + this.tileSize / 2, this.y + this.tileSize / 2, this.tileSize / 4, this.startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = 'blue';
        ctx.fill();
    }


    update(input){
        let tempX = this.x;
        let tempY = this.y;
        this.shot = false;
        if (input.includes("ArrowUp") && this.game.input.keyPressed["ArrowUp"]) {
            this.startAngle = 4.0;
            this.angleCoef = 1.7;
            tempY -= this.tileSize;
            this.game.input.keyPressed["ArrowUp"] = false;
            this.vector = "u";
        }
        if (input.includes("ArrowDown") && this.game.input.keyPressed["ArrowDown"]) {
            this.startAngle = 1.0;
            this.angleCoef = 0.7;
            tempY += this.tileSize;
            this.game.input.keyPressed["ArrowDown"] = false;
            this.vector = "d";
        }
        if (input.includes("ArrowLeft") && this.game.input.keyPressed["ArrowLeft"]) {
            this.startAngle = 2.7;
            this.angleCoef = 1.2;
            tempX -= this.tileSize;
            this.game.input.keyPressed["ArrowLeft"] = false;
            this.vector = "l";
        }
        if (input.includes("ArrowRight") && this.game.input.keyPressed["ArrowRight"]) {
            this.startAngle = -0.6;
            this.angleCoef = 0.25;
            tempX += this.tileSize;
            this.game.input.keyPressed["ArrowRight"] = false;
            this.vector = "r";
        }
        if (input.includes(" ") && this.game.input.keyPressed[" "]) {
            this.game.input.keyPressed[" "] = false;
                this.numberOfShots --;
                if(this.numberOfShots<0){
                    this.numberOfShots=0;
                }else{
                    this.shot = true;
                }           
        }

        this.controlWall(tempX, tempY);
        this.controlColisionWithDot();
    }


    placePlayerOn() {
        let passableCells = this.getPassableCells();
        let randomIndex = Math.floor(Math.random() * passableCells.length);
        let randomCell = passableCells[randomIndex];
    
        this.x = randomCell.x * this.tileSize;
        this.y = randomCell.y * this.tileSize;
    }

    getPassableCells() {
        let passableCells = [];
        let rows = this.level.length;
        let cols = this.level[0].length;
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!this.level[i][j]) {
                    passableCells.push({x: j, y: i});
                }
            }
        }
        return passableCells;
    }


    controlWall(x,y){
        let row = Math.floor(y / this.tileSize);
        let col = Math.floor(x / this.tileSize);
        
        if (row >= 0 && row < this.level.length && col >= 0 && col < this.level[0].length) {
            if (!this.level[row][col]) {
                this.x = x;
                this.y = y;
            }
        }
    }

    controlColisionWithDot(){
        this.game.dotsArray.forEach(element => {
            const dx = (this.x + this.tileSize / 2) - element.x;
            const dy = (this.y + this.tileSize / 2) - element.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const radius = 3;
        
            if(distance <= radius * 2){
                this.lives-=0.1;
                if(this.lives<0){
                    this.lives=0;
                }
            }
            
        });
    }

}