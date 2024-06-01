import { Place} from './place.js';
import { Player} from './player.js';
import { Bullet } from './bullet.js';
import { Dot } from './dot.js';
import { InputHandler } from './inputKey.js';


window.addEventListener('load',function(){
    const canvas = this.document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 800;
    const startLives = 100;
    const tileSize = 40;
    const numberOfDots = 100;
    const clusterRadius = 1;
    const speedDot = 1;
    var maxLevel = 3;
    var actualLevel = 0;
    let enemyCount = 0;
    let ammoCount = 0;
    let liveCount = startLives;
    const fullScreenButton = this.document.getElementById('fullScreenButton');
    const l1 = this.document.getElementById('levelBtn');
    const enemyCountElement = document.getElementById('enemyCount');
    const ammoCountElement = document.getElementById('ammoCount');
    const liveCountElement = document.getElementById('liveCount');
    fullScreenButton.addEventListener('click',toggleFullScreen);
    l1.addEventListener('click',levelShow);



    class Game{
        constructor(width,height,lives){
            this.width = width;
            this.height = height;
            this.tileSize = tileSize;
            this.lives = lives;
            this.keyPressed = {};
            this.bulletsArray = [];
            this.dotsArray = [];
            this.input = new InputHandler(this);
            this.place = new Place(this);
            this.player = new Player(this);
            
            

        }
        update(deltaTime){
            this.keyPressed = this.input.keyPressed;
            this.player.update(this.input.keys,this.keyPressed);
            if(this.player.shot){
                let bullet = new Bullet(this,this.player.x + this.tileSize/2, this.player.y + this.tileSize/2, this.player.vector)
                bullet.level = game.place.level;
                this.bulletsArray.push(bullet);
            }
            this.bulletsArray.forEach(bullet => bullet.update());

            this.dotsArray = this.dotsArray.filter(dot => !dot.terminate);
            this.dotsArray.forEach(dot => dot.update());
            enemyCount = this.dotsArray.length;
            ammoCount = this.player.numberOfShots;
            liveCount = this.player.lives;
            enemyCountElement.textContent = enemyCount;
            ammoCountElement.textContent = ammoCount;
            liveCountElement.textContent = Math.floor(liveCount);


        }

        draw(context){
            this.place.draw(context);
            this.player.draw(context);
            this.bulletsArray.forEach(bullet => bullet.draw(context));
            this.dotsArray.forEach(dot => dot.draw(context));
        }

    }

    const game = new Game(canvas.width,canvas.height,startLives);
    console.log(game);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(deltaTime);
        game.draw(ctx);


        if(!game.gameOver)requestAnimationFrame(animate);
    }

    function toggleFullScreen(){
        if(!document.fullscreenElement){
            canvas.requestFullscreen().catch(err =>{
                alert(`err neni full screen mode: ${err.message}`)
            });
        }else{
            document.exitFullscreen();
        }
    }

    function levelShow(){
        if(actualLevel<maxLevel-1){
            actualLevel ++
        }else{
            actualLevel = 0;
        }
        game.place.level = game.place.levels[actualLevel];
        game.player.level = game.place.level;

        game.player.placePlayerOn();
        game.dotsArray = [];
        game.player.lives = startLives;
        game.player.numberOfShots = 100;
        initDots();
    }


    function initDots() {
        let centerXY = getFreeCenterXY();
        const centerX = centerXY.x;
        const centerY = centerXY.y;
    
        for (let i = 0; i < numberOfDots; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * clusterRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            game.dotsArray.push(new Dot(game,x, y, 3,speedDot))
        }
    }


    function getFreeCenterXY() {
        let freeCells = [];
        let centerXY={
            x: 1,
            y: 1
        }
        let rows = game.place.level.length;
        let cols = game.place.level[0].length;
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!game.place.level[i][j]) {
                    freeCells.push({x: j, y: i});
                }
            }
        }

        let randomCell = freeCells[Math.ceil(freeCells.length/2)];
        centerXY.x = randomCell.x * tileSize + (tileSize/2);
        centerXY.y = randomCell.y * tileSize + (tileSize/2);
        return centerXY;
    }





    initDots();
    animate(0);

});